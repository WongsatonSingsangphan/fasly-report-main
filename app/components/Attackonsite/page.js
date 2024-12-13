"use client";
import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../Header/page";
import Footer from "../Futter/page";
import RequestVolume from "./components/RequestVolume";
import OWASP from "./components/OWASP";
import TrafficSourceAnomalies from "./components/TrafficSourceAnomalies";
import RequestAnomalies from "./components/RequestAnomalies";
import ResponseAnomalies from "./components/ResponseAnomalies";
import Scanners from "./components/Scanners";
import { StateContext } from "@/context/page";

function Page() {
  const { state } = useContext(StateContext);
  
  const renderGroup1 = (site) => (
    <Box
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
      <Header sitename={site.site} />
      <Box sx={{  display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            border: "1px solid #737373",
            borderRadius: "10px",
            
            marginBottom: "1px",
          }}
        >
          <RequestVolume requestData={site.requestdata} />
        </Box>
        <Box
          sx={{
            display: "flex",
            border: "1px solid #737373",
            borderRadius: "10px",
           
            marginBottom: "1px",
          }}
        >
          <OWASP owaspData={site.owaspdata} />
        </Box>
        <Box
          sx={{
            display: "flex",
            border: "1px solid #737373",
            borderRadius: "10px",
            
            marginBottom: "1px",
          }}
        >
          <Scanners scannersData={site.scanData} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );

  const renderGroup2 = (site) => (
    <Box
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
      <Header sitename={site.site} />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            border: "1px solid #737373",
            borderRadius: "10px",
            
            marginBottom: "1px",
          }}
        >
          <TrafficSourceAnomalies trafficData={site.trafficData} />
        </Box>
        <Box
          sx={{
            display: "flex",
            border: "1px solid #737373",
            borderRadius: "10px",
            
            marginBottom: "1px",
          }}
        >
          <RequestAnomalies anomaliesData={site.anomaliesdata} />
        </Box>
        <Box
          sx={{
            display: "flex",
            border: "1px solid #737373",
            borderRadius: "10px",
            marginBottom: "1px",
          }}
        >
          <ResponseAnomalies responseData={site.responseAnomaliesData} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
  if (!state || !state.sites) {
    return <Typography>No data available</Typography>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "#f4f4f4", }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {state.sites.map((site, index) => (
          <React.Fragment key={index}>
            {renderGroup1(site)}
            {renderGroup2(site)}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

export default Page;
