"use client";
import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header/page';
import Footer from '../Futter/page';
import Allrequest from './components/allrequest';
import RequestsChart from './components/requestsChart';
import { Box } from '@mui/material';
import Allsitename from './components/allsitename';

function Page() {

  return (
    <Box sx={{ display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            width: '210mm', height: '302mm', paddingLeft: '4mm', paddingRight: '4mm', bgcolor: '#ffffff',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Header/>
          <Box sx={{ display: 'flex',border: '1px solid #737373',borderRadius: '10px'}}>
            <Box sx={{display:'flex',flexDirection:'column',width:"100%"}}>
                  <Allrequest />
                  <RequestsChart />
                  <Allsitename/>
            </Box>
          </Box>
          <Footer  />
        </Box>
    </Box>
  );
  
}  

export default Page;
