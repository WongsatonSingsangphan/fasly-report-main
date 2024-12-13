import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js/auto";
import { Box } from "@mui/material";
import { FiArrowUpRight } from "react-icons/fi";
import { StateContext } from "@/context/page";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Scanners({ scannersData }) {
  const { state } = useContext(StateContext);
  const from = state.from;
  const until = state.until;

  // Trim and aggregate data for 7 days
  const trimmedData = scannersData.flat().map((item) => ({
    ...item,
    data: item.data.slice(0, 168), // Keep only the first 7 days (7 * 24 = 168 hours)
  }));

  const aggregatedData = trimmedData.map((item) => ({
    ...item,
    data: Array.from({ length: 7 }, (_, i) =>
      item.data.slice(i * 24, (i + 1) * 24).reduce((sum, value) => sum + value, 0)
    ),
  }));
  const getDateLabels = (from, until) => {
    const startDate = new Date(from * 1000);
    const endDate = new Date(until * 1000);
    const labels = [];

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
      }).format(date);
      labels.push(formattedDate);
    }

    return labels.slice(0, 7); 
  };

  const labels = getDateLabels(from, until);

  const datasets = aggregatedData.map((item) => ({
    label: item.type,
    data: item.data,
    backgroundColor:
      item.type === "USERAGENT"
        ? "#5271ff"
        : item.type === "BACKDOOR"
        ? "#5ce1e6"
        : item.type === "FORCEFULBROWSING"
        ? "#ffbe59"
        : item.type === "PRIVATEFILE"
        ? "#4BC0C0"
        : "#e8c3b9", // Default for other types
    borderWidth: 1,
  }));

  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
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
    },
  };

  // Create boxes dynamically based on aggregatedData
  const boxes = aggregatedData.map((item) => ({
    color:
      item.type === "USERAGENT"
        ? "#5271ff"
        : item.type === "BACKDOOR"
        ? "#5ce1e6"
        : item.type === "FORCEFULBROWSING"
        ? "#ffbe59"
        : item.type === "PRIVATEFILE"
        ? "#4BC0C0"
        : "#e8c3b9", // Default for other types
    label: item.type,
    value: item.summaryCount,
    description:
      item.type === "USERAGENT"
        ? "Scans user agents to detect anomalies."
        : item.type === "BACKDOOR"
        ? "Detects potential backdoor access to systems."
        : item.type === "FORCEFULBROWSING"
        ? "Monitors for unauthorized browsing attempts."
        : item.type === "PRIVATEFILE"
        ? "Identifies private files exposed unintentionally."
        : "Scans for other potential threats.",
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", p: 1 }}>
      <Box sx={{ color: "#8055a2", fontSize: "14px", mb: 1 }}>SCANNERS</Box>
      <Box sx={{ fontSize: "8px", mb: 1 }}>
        Scanners refer to tools used to check the security of a system.
      </Box>

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        {boxes.map((box, index) => (
          <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.3,
            bgcolor: box.color,
            borderRadius: "6px",
            width: "120px",
            height: "50px",
            color: "#fff",
            fontSize: "9px",
            overflow: "hidden", 
            textOverflow: "ellipsis", 
            whiteSpace: "nowrap", 
          }}
        >
            <Box
              sx={{
                display: "flex",
                width: "30px",
                height: "30px",
                bgcolor: "#ffffff",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "25px",
                  height: "25px",
                  border: `2px solid ${box.color}`,
                  borderRadius: "50%",
                }}
              >
                <FiArrowUpRight color={box.color} />
              </Box>
            </Box>
            <Box
              sx={{
                fontWeight: 600,
                fontSize: "8px", 
                whiteSpace: "nowrap",
                overflow: "hidden", 
                textOverflow: "ellipsis", 
              }}
            >
              <Box sx={{ fontWeight: 600 }}>{box.label}</Box>
              <Box>{box.value}</Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ height: "200px", mb: 2, width: "80%" }}>
          <Bar data={data} options={options} />
        </Box>
        <Box sx={{ width: "20%" }}>
          {boxes.map((box, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "start", justifyContent: "center", gap: 1, mb: 1 }}>
              <Box>
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    bgcolor: box.color,
                    borderRadius: "100%",
                    mt: "5px",
                  }}
                ></Box>
              </Box>
              <Box>
                <Box sx={{ fontSize: "10px", fontWeight: 600 }}>{box.label}</Box>
                <Box sx={{ fontSize: "8px" }}>{box.description}</Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Scanners;
