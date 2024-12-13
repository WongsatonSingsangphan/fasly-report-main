"use client";
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/page';
import Footer from '../Futter/page';
import { Box } from '@mui/material';
import TopAcctAttack from './components/topacctack';
import { StateContext } from '@/context/page';

function Page() {
  const { state } = useContext(StateContext);
  const [pagesData, setPagesData] = useState([]);

  useEffect(() => {
    const allSiteDataList = state.sitesummary2 || [];
    const pages = [];

    // แบ่งข้อมูลเป็นกลุ่มละ 2 ชุด
    for (let i = 0; i < allSiteDataList.length; i += 2) {
      pages.push(allSiteDataList.slice(i, i + 2));
    }

    setPagesData(pages);
  }, [state]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {pagesData.map((group, pageIndex) => (
        <Box
          key={pageIndex}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '210mm',
            height: '302mm',
            paddingLeft: '4mm',
            paddingRight: '4mm',
            bgcolor: '#ffffff',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Header />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #737373',
              borderRadius: '10px',
              padding: '10px',
            }}
          >
            <TopAcctAttack summaryData={group} />
          </Box>
          <Footer />
        </Box>
      ))}
    </Box>
  );
}

export default Page;
