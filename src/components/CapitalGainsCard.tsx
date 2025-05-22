import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CapitalGainsCardProps {
  title: string;
  stcg: {
    profits: number;
    losses: number;
  };
  ltcg: {
    profits: number;
    losses: number;
  };
  savings?: number;
}

const StyledCard = styled(Card)<{ isAfterHarvesting?: boolean }>(({ isAfterHarvesting }) => ({
  background: isAfterHarvesting
    ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    : '#fff',
  color: isAfterHarvesting ? '#fff' : '#222',
  minWidth: 340,
  borderRadius: 12,
  boxShadow: '0 2px 8px 0 rgba(16,30,54,.06)',
  border: isAfterHarvesting ? 'none' : '1px solid #e5e7eb',
  padding: 0,
}));

const formatCurrency = (value: number) => {
  const abs = Math.abs(value);
  return `${value < 0 ? '- ' : ''}$ ${abs.toLocaleString()}`;
};

const CapitalGainsCard: React.FC<CapitalGainsCardProps> = ({ title, stcg, ltcg, savings }) => {
  const calculateNetGains = (profits: number, losses: number) => profits - losses;
  const stcgNet = calculateNetGains(stcg.profits, stcg.losses);
  const ltcgNet = calculateNetGains(ltcg.profits, ltcg.losses);
  const realisedGains = stcgNet + ltcgNet;
  const isAfter = title.toLowerCase().includes('after');

  return (
    <StyledCard isAfterHarvesting={isAfter}>
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: isAfter ? '#fff' : '#222' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2 }}>
          {/* Labels column */}
          <Box sx={{ flex: 1, minWidth: 120 }}>
            <Typography sx={{ fontWeight: 500, mb: 2, opacity: isAfter ? 1 : 0.7 }}>
              {/* Empty for spacing */}
            </Typography>
            <Typography sx={{ fontWeight: 500, mb: 2 }}>Profits</Typography>
            <Typography sx={{ fontWeight: 500, mb: 2 }}>Losses</Typography>
            <Typography sx={{ fontWeight: 500 }}>Net Capital Gains</Typography>
          </Box>
          {/* Short-term column */}
          <Box sx={{ flex: 1, minWidth: 120, textAlign: 'right' }}>
            <Typography sx={{ fontWeight: 500, mb: 2, opacity: isAfter ? 1 : 0.7 }}>Short-term</Typography>
            <Typography sx={{ mb: 2 }}>{formatCurrency(stcg.profits)}</Typography>
            <Typography sx={{ mb: 2 }}>{formatCurrency(-Math.abs(stcg.losses))}</Typography>
            <Typography>{formatCurrency(stcgNet)}</Typography>
          </Box>
          {/* Long-term column */}
          <Box sx={{ flex: 1, minWidth: 120, textAlign: 'right' }}>
            <Typography sx={{ fontWeight: 500, mb: 2, opacity: isAfter ? 1 : 0.7 }}>Long-term</Typography>
            <Typography sx={{ mb: 2 }}>{formatCurrency(ltcg.profits)}</Typography>
            <Typography sx={{ mb: 2 }}>{formatCurrency(-Math.abs(ltcg.losses))}</Typography>
            <Typography>{formatCurrency(ltcgNet)}</Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2, mb: isAfter && savings ? 2 : 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: isAfter ? '#fff' : '#222' }}>
            {isAfter ? 'Effective Capital Gains:' : 'Realised Capital Gains:'}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: isAfter ? '#fff' : '#222', letterSpacing: 1 }}
          >
            {isAfter && realisedGains < 0 ? '- ' : ''}$ {Math.abs(realisedGains).toLocaleString()}
          </Typography>
        </Box>
        {isAfter && savings !== undefined && savings > 0 && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(255,255,255,0.10)', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <span role="img" aria-label="party">🎉</span>
            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 500 }}>
              You are going to save upto <b>$ {savings.toLocaleString()}</b>
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default CapitalGainsCard; 