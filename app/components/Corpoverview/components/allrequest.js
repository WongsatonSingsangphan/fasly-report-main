import { StateContext } from '@/context/page';
import { Box } from '@mui/material'
import React, { useContext } from 'react'
import { FiArrowUpRight } from "react-icons/fi";

function allrequest() {
    const { state } = useContext(StateContext);
    const formatNumber = (num) => {
        if (num >= 1000) {
          return (num / 1000).toFixed(1) + 'k'; 
        }
        return num; 
      };
  return (
    <Box >
        <Box sx={{fontSize:'14px',fontWeight:600,color:'#8055a2',px:1,py:1}}>CORP OVERVIEW</Box>
        <Box sx={{fontSize:'8px',p:1}}>All Requests</Box>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',gap:4.5}}>
            <Box sx={{display:'flex',width:'150px',height:'65px',borderRadius:'8px',justifyContent:'center',alignItems:'center',gap:1,bgcolor:'#FABC3F'}}>
                <Box sx={{display:'flex',width:'35px',height:'35px',bgcolor:'#ffffff',borderRadius:'40px',justifyContent:'center',alignItems:'center'}}>
                    <Box sx={{border: '2px solid #FABC3F', display: 'flex',justifyContent: 'center',alignItems: 'center',width: '30px',height: '30px',borderRadius: '50%',}}>
                        <FiArrowUpRight />
                    </Box>
                </Box>
                <Box>
                    <Box sx={{fontSize:'12px',fontWeight:600,color:'#fff'}}>All Requests</Box>
                    <Box sx={{fontSize:'10px',color:'#fff'}}>{formatNumber(state.requests_total || 0)}</Box>
                </Box>
            </Box>
            <Box sx={{display:'flex',width:'150px',height:'65px',borderRadius:'8px',justifyContent:'center',alignItems:'center',gap:1,bgcolor:'#e85c0d'}}>
                <Box sx={{display:'flex',width:'35px',height:'35px',bgcolor:'#ffffff',borderRadius:'40px',justifyContent:'center',alignItems:'center'}}>
                    <Box sx={{border: '2px solid #e85c0d', display: 'flex',justifyContent: 'center',alignItems: 'center',width: '30px',height: '30px',borderRadius: '50%',}}>
                        <FiArrowUpRight />
                    </Box>
                </Box>
                <Box>
                    <Box sx={{fontSize:'12px',fontWeight:600,color:'#fff'}}>Attack Requests</Box>
                    <Box sx={{fontSize:'10px',color:'#fff'}}>{formatNumber(state.requests_attack || 0)}</Box>
                </Box>
            </Box>
            <Box sx={{display:'flex',width:'150px',height:'65px',borderRadius:'8px',justifyContent:'center',alignItems:'center',gap:1,bgcolor:'#e0e0e0'}}>
                <Box sx={{display:'flex',width:'35px',height:'35px',bgcolor:'#ffffff',borderRadius:'40px',justifyContent:'center',alignItems:'center'}}>
                    <Box sx={{border: '2px solid #e0e0e0', display: 'flex',justifyContent: 'center',alignItems: 'center',width: '30px',height: '30px',borderRadius: '50%',}}>
                        <FiArrowUpRight />
                    </Box>
                </Box>
                <Box >
                    <Box sx={{fontSize:'12px',fontWeight:600,color:'#fff'}}>Block Requests</Box>
                    <Box sx={{fontSize:'10px',color:'#fff'}}>{formatNumber(state.requests_total_blocked || 0)}</Box>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default allrequest