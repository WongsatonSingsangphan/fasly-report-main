"use client";
import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import Header from "../Header/page";
import Footer from "../Futter/page";
import { StateContext } from "@/context/page";

function Page() {
  const { state } = useContext(StateContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#f4f4f4",
      }}
    >
      {state.eventattackData2 &&
      Array.isArray(state.eventattackData2) &&
      state.eventattackData2.length > 0 ? (
        state.eventattackData2.map((siteData, siteIndex) => (
          <Box
            key={siteIndex}
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
            <Box sx={{ flexShrink: 0 }}>
              <Header sitename={siteData.siteName || `Site ${siteIndex + 1}`} />
            </Box>
            <Box
              sx={{
                flex: 1,
                padding: "10px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Section: Even */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #737373",
                gap: 1,
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <Box sx={{ fontWeight: 600, fontSize: "16px", color: "#8055a2" }}>
                Even
              </Box>
              <Box sx={{ fontSize: "12px"}}>
                IPs flagged for exceeding thresholds
              </Box>
              {siteData.eventattackData && siteData.eventattackData.length > 0 ? (
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap",justifyContent:'space-between' }}>
                  {siteData.eventattackData.slice(0, 3).map((event, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "180px",
                        bgcolor: "#fdfdfd",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginBottom: "10px",
                        }}
                      >
                        <Box
                          component="img"
                          src={event.flagSvg}
                          alt={`${event.remoteCountryCode} flag`}
                          sx={{
                            width: "30px",
                            height: "20px",
                            borderRadius: "5px",
                          }}
                        />
                        <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                          {event.remoteIP} ({event.remoteCountryCode})
                        </Typography>
                      </Box>

                      {/* แสดง Tags */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          marginBottom: "10px",
                        }}
                      >
                        {event.tags.map((tag, tagIndex) => (
                          <Box
                            key={tagIndex}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              bgcolor: "#ebcdf4",
                              height: "30px",
                              padding: "0 8px",
                              borderRadius: "5px",
                              fontSize: "12px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                            }}
                          >
                            {tag}
                          </Box>
                        ))}
                      </Box>

                      {/* แสดง Timestamp */}
                      <Box sx={{ fontSize: "12px", color: "#737373" }}>
                        {event.timestamp}
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography sx={{ color: "#737373", fontSize: "14px",display:'flex',justifyContent:'center' }}>
                  No event data available.
                </Typography>
              )}
            </Box>
              {/* Section: TOP ATTACKS */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  border: "1px solid #737373",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <Box
                  sx={{ fontWeight: 600, fontSize: "16px", color: "#8055a2" }}
                >
                  TOP ATTACKS
                </Box>
                <Box sx={{ fontSize: "10px" }}>
                  Top URLs containing attack signals
                </Box>
                {siteData.topAttacks && siteData.topAttacks.length > 0 ? (
                  siteData.topAttacks.map((attack, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "10px",
                        padding: "5px 0",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        gap: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: "10px",
                          height: "10px",
                          bgcolor: "#5271ff",
                          borderRadius: "100%",
                        }}
                      ></Box>
                      <Box
                        sx={{
                          flex: 1,
                          textAlign: "left",
                          wordWrap: "break-word",
                          whiteSpace: "normal",
                          overflowWrap: "break-word",
                        }}
                        title={attack.value}
                      >
                        {attack.value}
                      </Box>
                      <Box
                        sx={{
                          flex: "0 0 auto",
                          textAlign: "right",
                          fontWeight: 600,
                        }}
                      >
                        {attack.count} requests
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#737373",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    No top attacks found.
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  border: "1px solid #737373",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <Box
                  sx={{ fontWeight: 600, fontSize: "16px", color: "#8055a2" }}
                >
                  EVENT ATTACK REQUEST
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  <Box sx={{ width: "30%", textAlign: "left" }}>Source</Box>
                  <Box sx={{ width: "40%", textAlign: "center" }}>
                    Signals/Payloads
                  </Box>
                  <Box sx={{ width: "30%", textAlign: "right" }}>Response</Box>
                </Box>
                {siteData.eventattackData &&
                siteData.eventattackData.length > 0 ? (
                  siteData.eventattackData.slice(0, 6).map((event, index) => ( // เพิ่ม .slice(0, 6)
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "10px",
                        padding: "5px 0",
                        borderBottom:
                          index < siteData.eventattackData.length - 1
                            ? "1px solid #FFF"
                            : "none",
                      }}
                    >
                      {/* Source Section */}
                      <Box sx={{ width: "30%", textAlign: "left" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          <Box
                            component="img"
                            src={event.flagSvg}
                            alt={`${event.remoteCountryCode} flag`}
                            sx={{
                              width: "20px",
                              height: "15px",
                              borderRadius: "3px",
                            }}
                          />
                          <Box>({event.name})</Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            fontSize: "10px",
                            fontWeight: 600,
                          }}
                        >
                          {event.remoteIP}
                        </Box>
                        <Box
                          sx={{
                            fontSize: "9px",
                            color: "#737373",
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                            overflowWrap: "break-word",
                            display: "block",
                          }}
                        >
                          {event.serverHostname}
                          {event.uri}
                        </Box>
                      </Box>

                      {/* Signals/Payloads Section */}
                      <Box sx={{ width: "40%", textAlign: "center" }}>
                        {event.tags.map((tag, tagIndex) => (
                          <Box
                            key={tagIndex}
                            sx={{
                              display: "inline-block",
                              margin: "2px",
                              padding: "2px 5px",
                              bgcolor:
                                tag === "BLOCKED" ? "#ebcdf4" : "#fcf5f3",
                              borderRadius: "5px",
                              fontSize: "9px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                            }}
                          >
                            {tag}
                          </Box>
                        ))}
                      </Box>

                      {/* Response Section */}
                      <Box sx={{ width: "30%", textAlign: "right" }}>
                        <Box>
                          Status:{" "}
                          {event.tags.includes("BLOCKED")
                            ? "Blocked"
                            : "Allowed"}
                        </Box>
                        <Box>Agent: {event.agentResponseCode}</Box>
                        <Box>Server: {event.responseCode}</Box>
                        <Box>Response size: {event.responseSize}B</Box>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography
                    sx={{
                      color: "#737373",
                      fontSize: "14px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    No event attack request data available.
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <Footer />
            </Box>
          </Box>
        ))
      ) : (
        <Typography>No site data available.</Typography>
      )}
    </Box>
  );
}

export default Page;
