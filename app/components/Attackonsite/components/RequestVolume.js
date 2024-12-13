import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js/auto';
import { Box } from '@mui/material';
import { StateContext } from '@/context/page';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RequestVolume = ({ requestData }) => {
  const { state } = useContext(StateContext);
  const from = Math.floor(state.from / 1000); 
  const until = Math.floor(state.until / 1000); 
  
  const rawData = requestData[0]?.[0]?.data || [];
  const totalRequestCount = requestData[0]?.[0]?.summaryCount || 0;
  
  const labels = [];
  const startDate = new Date(from * 1000); 
  const endDate = new Date(until * 1000);
  

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    labels.push(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })); 
  }
  
  const dailyData = Array(labels.length).fill(0);
  rawData.slice(0, labels.length).forEach((value, index) => { 
    dailyData[index] += value;
  });
  

 
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Requests',
        data: dailyData,
        borderColor: '#8055a2',
        backgroundColor: 'transparent',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      datalabels: {
        display: false, 
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
        title: {
          display: true,
        },
      },
    },
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', color: '#8055a2', px: 1 }}>Request Volume</Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, py: 1 }}>
        <Box sx={{ fontSize: '10px' }}>All requests for this site.</Box>
        <Box sx={{ fontSize: '10px' }}>{(totalRequestCount / labels.length).toFixed(2)} average RPS</Box>
      </Box>
      <Box sx={{ height: '200px', width: '750px', py: 1 }}>
        <Line data={data} options={options} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
        <Box sx={{ fontSize: '10px' }}>Total Requests</Box>
        <Box sx={{ fontSize: '10px' }}>{totalRequestCount.toLocaleString()} Requests</Box>
      </Box>
    </Box>
  );
};

export default RequestVolume;
