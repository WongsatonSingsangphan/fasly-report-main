import { Box } from '@mui/material'
import React from 'react'
import { PiPhoneCallLight } from "react-icons/pi";
import { MdLanguage } from "react-icons/md";
import { TbMapPinFilled } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";

function page() {
  return (
    <Box >
      <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Box sx={{width:'50%',height:'10px',bgcolor:'#000000'}}></Box>
        <Box sx={{display:'flex',width:'50%',height:'4px',bgcolor:'#e51b20'}}></Box>
      </Box>
      <Box sx={{display:'flex',alignItems:'center',mt:1,gap:1}}>
      <Box sx={{display:'flex',width:'27px',height:'23px',borderRadius: '100%',justifyContent:'center',alignItems:'center',border: '1px solid #ea464a',}} >
        <PiPhoneCallLight/> 
      </Box>
      <Box sx={{fontSize:'8px'}}>082446695</Box>
      <Box sx={{display:'flex',width:'27px',height:'23px',borderRadius: '100%',justifyContent:'center',alignItems:'center',border: '1px solid #ea464a',}} >
        <MdOutlineEmail/> 
      </Box>
      <Box sx={{fontSize:'8px'}}>sales@tracthai.com</Box>
      <Box sx={{display:'flex',width:'27px',height:'23px',borderRadius: '100%',justifyContent:'center',alignItems:'center',border: '1px solid #ea464a',}} >
        <MdLanguage /> 
      </Box>
      <Box sx={{fontSize:'8px'}}>www.tracthai.com</Box>
      <Box sx={{display:'flex',width:'27px',height:'23px',borderRadius: '100%',justifyContent:'center',alignItems:'center',border: '1px solid #ea464a',}} >
        <TbMapPinFilled /> 
      </Box>
      <Box sx={{fontSize:'8px'}}>The Recovery Advisor Company Limited
        45 Soi Kosumruamchai 37. Donmueang,Donmueang,
        Bangkok 10210</Box>
      </Box>
    </Box>
  )
}

export default page