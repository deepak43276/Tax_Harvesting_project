import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Box,
  Typography,
  Link as MuiLink,
  Tooltip,
} from '@mui/material';
import { Holding } from '../types';

interface HoldingsTableProps {
  holdings: Holding[];
  selectedHoldings: { [key: string]: boolean };
  onSelectionChange: (coin: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  showAll: boolean;
  onToggleShowAll: () => void;
}

const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings,
  selectedHoldings,
  onSelectionChange,
  onSelectAll,
  showAll,
  onToggleShowAll,
}) => {
  const allSelected = holdings.length > 0 && holdings.every((holding) => selectedHoldings[holding.coin]);
  const someSelected = holdings.some((holding) => selectedHoldings[holding.coin]);

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#222' }}>Holdings</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 8px 0 rgba(16,30,54,.06)', bgcolor: '#f8fafc' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f1f5f9' }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected && !allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  sx={{ color: '#1976d2' }}
                />
              </TableCell>
              <TableCell>Asset</TableCell>
              <TableCell>
                Holdings
                <Typography variant="caption" color="textSecondary" display="block">
                  Current Market Rate
                </Typography>
              </TableCell>
              <TableCell>Total Current Value</TableCell>
              <TableCell>Short-term</TableCell>
              <TableCell>Long-Term</TableCell>
              <TableCell>Amount to Sell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holdings.map((holding) => {
              const amountToSell = selectedHoldings[holding.coin]
                ? holding.totalHolding.toLocaleString() + ' ' + holding.coin
                : '-';
              return (
                <TableRow
                  key={holding.coin}
                  hover
                  onClick={() => onSelectionChange(holding.coin, !selectedHoldings[holding.coin])}
                  sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#e0e7ef' } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={!!selectedHoldings[holding.coin]}
                      onChange={(e) => {
                        e.stopPropagation();
                        onSelectionChange(holding.coin, e.target.checked);
                      }}
                      sx={{ color: '#1976d2' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <img
                        src={holding.logo}
                        alt={holding.coin}
                        style={{ width: 28, height: 28, borderRadius: 6 }}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{holding.coin}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {holding.coinName}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>{holding.totalHolding.toLocaleString()} {holding.coin}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      ₹ {holding.currentPrice.toLocaleString()}/{holding.coin}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#fff' } }}
                  >
                    <Tooltip title={`₹ ${((holding.totalHolding || 0) * (holding.currentPrice || 0)).toLocaleString()}`} arrow>
                      <span>₹ {((holding.totalHolding || 0) * (holding.currentPrice || 0)).toLocaleString()}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: holding.stcg.gain >= 0 ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
                      {holding.stcg.gain >= 0 ? '+' : ''}₹{holding.stcg.gain.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {holding.stcg.balance.toLocaleString()} {holding.coin}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: holding.ltcg.gain >= 0 ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
                      {holding.ltcg.gain >= 0 ? '+' : ''}₹{holding.ltcg.gain.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {holding.ltcg.balance.toLocaleString()} {holding.coin}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {amountToSell !== '-' ? (
                      <Tooltip title={amountToSell} arrow>
                        <span>{amountToSell}</span>
                      </Tooltip>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ textAlign: 'right', mt: 1 }}>
        <MuiLink
          href="#"
          underline="hover"
          sx={{ color: '#1976d2', fontWeight: 500, fontSize: 15 }}
          onClick={e => {
            e.preventDefault();
            onToggleShowAll();
          }}
        >
          {showAll ? 'Show less' : 'View all'}
        </MuiLink>
      </Box>
    </Box>
  );
};

export default HoldingsTable; 