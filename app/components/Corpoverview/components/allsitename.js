import { StateContext } from '@/context/page';
import { Box } from '@mui/material';
import React, { useContext } from 'react';

function allsitename() {
  const { state } = useContext(StateContext);

  const siteNames = state.sitenam?.data || []; 
  const urlDomains = state.ListUrl?.domains || [];
  

  return (
    <Box>
      {/* SITE NAME Section */}
      <Box sx={{ fontSize: '14px', fontWeight: 600, color: '#8055a2', px: 1, py: 1 }}>SITE NAME</Box>
      <Box sx={{ display: 'flex', fontSize: '8px', px: 1 }}>All site.</Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', width: '900px', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', width: '20%', justifyContent: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px',
                color: '#000',
                border: '5px solid #fabc3f',
                borderRadius: '10%',
                width: '80px',
                height: '80px',
                backgroundColor: '#fdfff5',
              }}
            >
              {state.sitenam?.count || 0}
              <Box sx={{ fontSize: '12px' }}>Total</Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1, width: '80%' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {siteNames.map((site) => (
                <Box
                  key={site.name}
                  sx={{
                    flex: 'auto',
                    textAlign: 'center',
                    p: 1,
                    borderRadius: '50px',
                    bgcolor: '#fcf5f3',
                  }}
                >
                  {site.displayName}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* SITE URL Section */}
      <Box sx={{ fontSize: '14px', fontWeight: 600, color: '#8055a2', py: 1, mt: 2, px: 1 }}>SITE URL</Box>
      <Box sx={{ display: 'flex', fontSize: '8px', px: 1 }}>URL of all sites.</Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          mt: 2,
          mb: 4,
          px: 0.5,
        }}
      >
        <Box sx={{ display: 'flex', width: '900px', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', width: '20%', justifyContent: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px',
                color: '#000',
                border: '5px solid #fabc3f',
                borderRadius: '10%',
                width: '80px',
                height: '80px',
                backgroundColor: '#fdfff5',
              }}
            >
              {state.ListUrl?.count || 0}
              <Box sx={{ fontSize: '12px' }}>Total</Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 2, width: '80%' }}>
            <Box sx={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column', gap: 1 }}>
              {urlDomains.slice(0, Math.ceil(urlDomains.length / 2)).map((domain) => (
                <Box
                  key={domain.name}
                  sx={{ textAlign: 'start', p: 1, borderRadius: '50px', bgcolor: '#cce6ff',fontSize:'14px',fontWeight:400 }}
                >
                  - {domain.name}
                </Box>
              ))}
            </Box>
            <Box sx={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column', gap: 1 }}>
              {urlDomains.slice(Math.ceil(urlDomains.length / 2)).map((domain) => (
                <Box
                  key={domain.name}
                  sx={{ textAlign: 'start', p: 1, borderRadius: '50px', bgcolor: '#cce6ff',fontSize:'14px',fontWeight:400 }}
                >
                    - {domain.name}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default allsitename;
