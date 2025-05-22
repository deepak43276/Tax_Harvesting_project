import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const disclaimerPoints = [
  'Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.',
  'Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.',
  'Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.',
  'Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.',
  'Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.'
];

const Notes: React.FC = () => (
  <Box sx={{ mb: 3 }}>
    <Accordion defaultExpanded={false} sx={{
      bgcolor: '#f8fafc',
      borderRadius: 2,
      boxShadow: 'none',
      border: '1.5px solid #3b82f6',
      p: 0,
      '& .MuiAccordionSummary-root': { minHeight: 48 },
      '& .MuiAccordionDetails-root': { pt: 0 }
    }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoOutlinedIcon sx={{ color: '#1976d2', fontSize: 22 }} />
          <Typography sx={{ fontWeight: 600, color: '#222' }}>Important Notes & Disclaimers</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={{ pl: 3, pt: 0, pb: 0 }}>
          {disclaimerPoints.map((point, idx) => (
            <ListItem key={idx} sx={{ display: 'list-item', pl: 0, py: 0.5 }}>
              <ListItemText
                primary={<Typography variant="body2" color="#222" sx={{ fontSize: 15 }}>{point}</Typography>}
                sx={{ m: 0 }}
              />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  </Box>
);

export default Notes; 