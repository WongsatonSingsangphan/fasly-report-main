import React from 'react'
import Attackonsite from '../Attackonsite/page'
import Corpoverview from '../Corpoverview/page'
import Evenattack from '../Evenattack/page'
import Sitesummary from '../Sitesummary/page'
import { Box } from '@mui/material'

function page() {
  return (
    <Box>
        <Corpoverview/>
        <Sitesummary/>
        <Attackonsite/>
        <Evenattack/>
    </Box>
  )
}

export default page