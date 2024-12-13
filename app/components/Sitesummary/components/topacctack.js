"use client";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import dynamic from "next/dynamic";

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), { ssr: false });

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

import { VictoryPie, VictoryLabel } from 'victory';
import { StateContext } from "@/context/page";

const colors = [
  "#5271ff","#5ce1e6","#ffde59",
  "#FF9F40","#4BC0C0","#9966FF",
  "#C9CBCF","#A0A0A0","#E7E9ED",
  "#7B68EE","#8A2BE2","#FF4500",
];

const TopAcctAttack = ({ summaryData }) => {
  console.log("🚀 ~ TopAcctAttack ~ summaryData:", summaryData)
  const { state } = useContext(StateContext);
  const isClient = typeof window !== "undefined";

  const barChartOptions = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 8,
          },
          color: "#333",
        },
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#333",
        font: {
          size: 10,
          weight: "bold",
        },
        formatter: (value) => value.toLocaleString(),
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1000,
          font: {
            size: 8,
          },
          color: "#333",
        },
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 8,
          },
          color: "#333",
        },
      },
    },
  };

  const formatNumber = (number) => {
    if (typeof number !== "number") {
      return "0";
    }
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + "k";
    }
    return number.toString();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", px: 1 }}>
      <Box sx={{ fontWeight: 600, color: "#8055a2", fontSize: "14px" }}>REQUESTS BY SITE</Box>
      {Array.isArray(summaryData) && summaryData.length > 0 ? (
        summaryData.map((siteData, index) => {
          const pieChartData =
            siteData.topAttackTypes && siteData.topAttackTypes.length > 0
              ? siteData.topAttackTypes.map((type) => ({ x: type.tagName, y: type.tagCount }))
              : [{ x: "", y: 1 }];

          const barChartData =
            siteData.topAttackTypes && siteData.topAttackTypes.length > 0
              ? {
                  labels: siteData.topAttackTypes.map((type) => type.tagName),
                  datasets: [
                    {
                      label: "",
                      data: siteData.topAttackTypes.map((type) => type.tagCount),
                      backgroundColor: colors.slice(0, siteData.topAttackTypes.length),
                    },
                  ],
                }
              : { labels: ["No attacks detected during this period"], datasets: [] };

          return (
            <Box key={index}>
              <Box sx={{ display: "flex", mt: 1, px: 1 }}>
                <Box sx={{ width: "50%" }}>
                  <Box sx={{ fontSize: "10px", fontWeight: 600 }}>Site : {siteData.name}</Box>
                  <Box sx={{ fontSize: "8px" }}>Attack by country</Box>
                  <Box>
                    <Box sx={{display: "flex", justifyContent: "center",alignItems: "center",width: "100px",height: "30px",bgcolor: "#fcf5f3",fontSize: "8px",borderRadius: "5px",mt: 1}}>
                      {siteData.topAttackSources && siteData.topAttackSources.length > 0 ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <img
                            src={siteData.topAttackSources[0].flagSvg}
                            alt={siteData.topAttackSources[0].countryName}
                            style={{ width: "20px", height: "15px", borderRadius: "3px" }}
                          />
                          <span>
                            {state.requests_attack > 0
                              ? `${(
                                  (siteData.topAttackSources[0].requestCount / state.requests_attack) *
                                  100
                                ).toFixed(2)}%`
                              : "0%"}
                          </span>
                        </Box>
                      ) : (
                        "No Data"
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ width: "50%" }}>
                  <Box sx={{ fontSize: "8px", mt: 1 }}>Requests with attack signals</Box>
                  <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 1 }}>
                    <Box sx={{display: "flex",width: "150px",height: "65px",borderRadius: "8px",justifyContent: "center",alignItems: "center",gap: 1,bgcolor: "#5271ff"}}>
                      <Box>
                        <Box sx={{ fontSize: "10px", fontWeight: 600 }}>All Requests</Box>
                        <Box sx={{ fontSize: "10px" }}>{formatNumber(siteData.totalCount)}</Box>
                      </Box>
                    </Box>
                    <Box sx={{display: "flex",width: "150px",height: "65px",borderRadius: "8px",justifyContent: "center",alignItems: "center",gap: 1,bgcolor: "#38b6ff",}}>
                      <Box>
                        <Box sx={{ fontSize: "10px", fontWeight: 600 }}>Attack</Box>
                        <Box sx={{ fontSize: "10px" }}>{formatNumber(siteData.attackCount)}</Box>
                      </Box>
                    </Box>
                    <Box sx={{display: "flex",width: "150px",height: "65px",borderRadius: "8px",justifyContent: "center",alignItems: "center",gap: 1,bgcolor: "#ffbe59"}}>
                      <Box>
                        <Box sx={{ fontSize: "10px", fontWeight: 600 }}>Block</Box>
                        <Box sx={{ fontSize: "10px" }}>{formatNumber(siteData.blockedCount)}</Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {isClient && (
                  <>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <VictoryPie
                        data={pieChartData}
                        style={{data: { fillOpacity: 0.9, stroke: "#fff", strokeWidth: 2 },labels: { fontSize: 6, fill: "#333", fontWeight: "bold" }}}
                        colorScale={pieChartData.length > 1 ? colors : ["#C0C0C0"]}
                        width={390}height={390}innerRadius={50}
                        labels={({ datum }) =>
                          pieChartData.length > 1
                            ? `${datum.x}\n${datum.y.toLocaleString()}`
                            : "No attack data"
                        }
                      />
                      <VictoryLabel textAnchor="middle" verticalAnchor="middle" x={175} y={175} style={{ fontSize: 14, fill: "#333" }}/>
                    </Box>
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      {barChartData.datasets.length === 0 ? (
                        <Box sx={{display: "flex",alignItems: "center",justifyContent: "center",height: "100px",fontSize: "14px",
                            fontWeight: 500,color: "#666",}}>
                          No attacks detected during this period
                        </Box>
                      ) : (
                        <Bar data={barChartData} options={barChartOptions} height={300} width={400} />
                      )}
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          );
        })
      ) : (
        <Box>No Data</Box>
      )}
    </Box>
  );
};

export default TopAcctAttack;
