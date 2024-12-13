"use client";
import { Box,Grid,Grid2 } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import Logo from "../../../public/image/Trac-logo.svg";
import { StateContext } from "@/context/page";

function Page({ sitename }) {
  const { state } = useContext(StateContext);

  const formatDateWithTime = (timestamp) => {
    if (!timestamp) return "Invalid date";
    const timestampInMs = timestamp.length === 10 ? Number(timestamp) * 1000 : Number(timestamp);
    if (isNaN(timestampInMs)) return "Invalid date";
    const date = new Date(timestampInMs);

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Bangkok",
    }).format(date);
};


  return (
    <Box >
      <Box sx={{ position: "absolute", zIndex: 10 }}>
        <Image src={Logo} width={60} height={60} alt="Logo" />
      </Box>

      <Box sx={{display: "flex",justifyContent: "center",fontSize: "30px",fontWeight: 600,color: "#ff3131",}}>
        FASTY WEEKY REPORT
      </Box>
      <Box>
        <Box />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Box sx={{ ml: 8, fontSize: "12px" }}>
            <Grid container>
              {Array.isArray(sitename) ? (
                sitename.map((sitenam, index) => (
                  <Grid
                    item
                    xs={6}
                    key={index}
                    sx={{ fontSize: "10px", width: "70px",fontWeight:600 }}
                  >
                    site: {sitenam}
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} sx={{ fontSize: "10px",fontWeight:600 }}>
                   {sitename || ""}
                </Grid>
              )}
            </Grid>
          </Box>
          <Box sx={{ fontSize: "8px" }}>
            Date: {formatDateWithTime(state?.from)} -{" "}
            {formatDateWithTime(state?.until)} GMT+7
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
