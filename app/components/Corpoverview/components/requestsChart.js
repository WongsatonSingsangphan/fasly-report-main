"use client";
import { StateContext } from '@/context/page';
import { Box } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { VictoryPie, VictoryTheme } from 'victory';

const RequestsChart = () => {
  const [isClient, setIsClient] = useState(false);
  const { state } = useContext(StateContext);

  const [anomalySignalsData, setAnomalySignalsData] = useState([]);
  const [attackSignalsData, setAttackSignalsData] = useState([]);

  useEffect(() => {
    setIsClient(true);
    if (state && state.anomarysignals) {
      const totalCount = state.anomarysignals.reduce((sum, item) => sum + item.count, 0);
      const filteredData = [];
      let otherCount = 0;
      state.anomarysignals.forEach((item) => {
        const percentage = (item.count / totalCount) * 100;
        if (percentage < 10) {
          otherCount += item.count;
        } else {
          filteredData.push({
            x: item.name,
            y: item.count,
          });
        }
      });

      if (otherCount > 0) {
        filteredData.push({
          x: 'Other',
          y: otherCount,
        });
      }
      setAnomalySignalsData(filteredData);
    }


    if (state && state.attcksignals) {
      const totalCount = state.attcksignals.reduce((sum, item) => sum + item.count, 0);

      const filteredData = [];
      let otherCount = 0;

      state.attcksignals.forEach((item) => {
        const percentage = (item.count / totalCount) * 100;
        if (percentage < 10) {
          otherCount += item.count;
        } else {
          filteredData.push({
            x: item.name,
            y: item.count,
          });
        }
      });

      if (otherCount > 0) {
        filteredData.push({
          x: 'Other',
          y: otherCount,
        });
      }

      setAttackSignalsData(filteredData);
    }
  }, [state]);

  const colors = [
    '#5271ff', '#5ce1e6', '#ffde59', '#FF9F40',
    '#4BC0C0', '#9966FF', '#C9CBCF', '#A0A0A0',
    '#E7E9ED', '#7B68EE', '#8A2BE2', '#FF4500'
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, p: 1, mt: 2 }}>
      <Box sx={{ fontWeight: 600, color: '#8055a2', fontSize: '14px' }}>TOP SIGNALS</Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 5 }}>
        {isClient && (
          <>
            <Box sx={{ width: '50%', textAlign: 'start' }}>
              <Box sx={{ fontSize: '10px', fontWeight: 600, ml: 0.3 }}>ATTACK SIGNALS</Box>
              <Box sx={{ fontSize: '8px', ml: 0.3 }}>
                 Indicators that suggest attempts or activities of potential attacks in the system
              </Box>
              {attackSignalsData.length > 0 ? (
                <VictoryPie data={attackSignalsData} colorScale={colors}
                  style={{data: {  },labels: { fontSize: 6, fill: '#333', fontWeight: 'bold' },}}
                  labelRadius={110} width={300} height={300}labels={({ datum }) => `${datum.x}\n${datum.y}`}
                  theme={VictoryTheme.material}/>
              ) : (
                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'20px', fontSize: '10px',fontWeight:500, mt: 20,bgcolor:'#f2f4f7'}}>No data available for Attack Signals</Box>
              )}
            </Box>
            <Box sx={{ width: '50%', textAlign: 'start' }}>
              <Box sx={{ fontSize: '10px', fontWeight: 600 }}>ANOMALY SIGNALS</Box>
              <Box sx={{ fontSize: '8px' }}>
                 Indicators that suggest there may be irregularities in the system
              </Box>
              {anomalySignalsData.length > 0 ? (
                <VictoryPie data={anomalySignalsData}colorScale={colors} style={{data: { },
                    labels: { fontSize: 6, fill: '#333', fontWeight: 'bold' },}} labelRadius={110}
                  width={300}
                  height={300}
                  labels={({ datum }) => `${datum.x}\n${datum.y}`}
                  theme={VictoryTheme.material}
                />
              ) : (
                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'20px', fontSize: '10px',fontWeight:500, mt: 20,bgcolor:'#f2f4f7'}}>No data available for Anomaly Signals</Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default RequestsChart;