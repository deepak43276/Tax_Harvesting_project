import React, { useEffect, useState } from 'react';
import { Container, Box, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import { fetchHoldings, fetchCapitalGains } from './services/api';
import { Holding, CapitalGains, SelectedHoldings } from './types';
import CapitalGainsCard from './components/CapitalGainsCard';
import HoldingsTable from './components/HoldingsTable';
import Header from './components/Header';
import Notes from './components/Notes';

const DEFAULT_VISIBLE = 5;

const App: React.FC = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [initialCapitalGains, setInitialCapitalGains] = useState<CapitalGains | null>(null);
  const [selectedHoldings, setSelectedHoldings] = useState<SelectedHoldings>({});
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const loadData = async () => {
      try {
        const [holdingsData, capitalGainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        setHoldings(holdingsData);
        setInitialCapitalGains(capitalGainsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSelectionChange = (coin: string, selected: boolean) => {
    setSelectedHoldings((prev) => ({
      ...prev,
      [coin]: selected,
    }));
  };

  const handleSelectAll = (selected: boolean) => {
    const newSelected: SelectedHoldings = {};
    holdings.forEach((holding) => {
      newSelected[holding.coin] = selected;
    });
    setSelectedHoldings(newSelected);
  };

  const calculateUpdatedCapitalGains = () => {
    if (!initialCapitalGains) return null;

    const updatedGains = {
      stcg: { ...initialCapitalGains.capitalGains.stcg },
      ltcg: { ...initialCapitalGains.capitalGains.ltcg },
    };

    holdings.forEach((holding) => {
      if (selectedHoldings[holding.coin]) {
        if (holding.stcg.gain > 0) {
          updatedGains.stcg.profits += holding.stcg.gain;
        } else {
          updatedGains.stcg.losses += Math.abs(holding.stcg.gain);
        }

        if (holding.ltcg.gain > 0) {
          updatedGains.ltcg.profits += holding.ltcg.gain;
        } else {
          updatedGains.ltcg.losses += Math.abs(holding.ltcg.gain);
        }
      }
    });

    return updatedGains;
  };

  const calculateSavings = () => {
    if (!initialCapitalGains) return 0;

    const initialStcgNet = initialCapitalGains.capitalGains.stcg.profits - initialCapitalGains.capitalGains.stcg.losses;
    const initialLtcgNet = initialCapitalGains.capitalGains.ltcg.profits - initialCapitalGains.capitalGains.ltcg.losses;
    const initialTotal = initialStcgNet + initialLtcgNet;

    const updatedGains = calculateUpdatedCapitalGains();
    if (!updatedGains) return 0;

    const updatedStcgNet = updatedGains.stcg.profits - updatedGains.stcg.losses;
    const updatedLtcgNet = updatedGains.ltcg.profits - updatedGains.ltcg.losses;
    const updatedTotal = updatedStcgNet + updatedLtcgNet;

    return initialTotal - updatedTotal;
  };

  if (loading || !initialCapitalGains) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: '#f8fafc',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const updatedGains = calculateUpdatedCapitalGains();
  const savings = calculateSavings();

  const visibleHoldings = showAll ? holdings : holdings.slice(0, DEFAULT_VISIBLE);

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="xl" sx={{ pt: 4, pb: 6 }}>
        <Notes />
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 3,
            mb: 4,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <CapitalGainsCard
              title="Pre Harvesting"
              stcg={initialCapitalGains.capitalGains.stcg}
              ltcg={initialCapitalGains.capitalGains.ltcg}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <CapitalGainsCard
              title="After Harvesting"
              stcg={updatedGains!.stcg}
              ltcg={updatedGains!.ltcg}
              savings={savings}
            />
          </Box>
        </Box>
        <HoldingsTable
          holdings={visibleHoldings}
          selectedHoldings={selectedHoldings}
          onSelectionChange={handleSelectionChange}
          onSelectAll={handleSelectAll}
          showAll={showAll}
          onToggleShowAll={() => setShowAll((prev) => !prev)}
        />
      </Container>
    </Box>
  );
};

export default App; 