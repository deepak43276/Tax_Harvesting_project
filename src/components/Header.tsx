import React from 'react';
import { AppBar, Toolbar, Typography, Box, Link as MuiLink } from '@mui/material';

const Header: React.FC = () => (
  <AppBar position="static" elevation={0} sx={{ bgcolor: '#fff', color: '#222', borderBottom: '1px solid #e5e7eb' }}>
    <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <img 
          src="/assets/images/logo.avif" 
          alt="KoinX Logo" 
          style={{ height: 32 }} 
        />
        <Typography variant="h6" sx={{ fontWeight: 700, ml: 1 }}>
          Tax Harvesting
        </Typography>
      </Box>
      <MuiLink href="#" underline="hover" sx={{ color: '#1976d2', fontWeight: 500, fontSize: 16 }}>
        How it works?
      </MuiLink>
    </Toolbar>
  </AppBar>
);

export default Header; 