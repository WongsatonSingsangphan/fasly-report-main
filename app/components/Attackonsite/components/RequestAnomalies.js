import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js/auto";
import { Box } from "@mui/material";
import { FiArrowUpRight } from "react-icons/fi";
import { StateContext } from "@/context/page";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RequestAnomalies({ anomaliesData }) {
  const { state } = useContext(StateContext);
  const from = state.from;
  const until = state.until;


  const trimmedData = anomaliesData.map((item) => ({
    ...item,
    data: item.data.slice(0, 168),
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
      item.type === "NULLBYTE"
        ? "#5271ff"
        : item.type === "IMPOSTOR"
        ? "#5ce1e6"
        : item.type === "NOUA"
        ? "#ffbe59"
        : item.type === "NOTUTF"
        ? "#4BC0C0"
        : item.type === "BLOCKED"
        ? "#e85d75"
        : "#e8c3b9",
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

  const boxes = aggregatedData.map((item) => ({
    color:
      item.type === "NULLBYTE"
        ? "#5271ff"
        : item.type === "IMPOSTOR"
        ? "#5ce1e6"
        : item.type === "NOUA"
        ? "#ffbe59"
        : item.type === "NOTUTF"
        ? "#4BC0C0"
        : item.type === "BLOCKED"
        ? "#e85d75"
        : "#e8c3b9",
    label: item.type,
    value: item.summaryCount,
    description:
      item.type === "NULLBYTE"
        ? "Use of a null byte in a request, which may be used in attacks."
        : item.type === "IMPOSTOR"
        ? "A request that presents a false identity."
        : item.type === "NOUA"
        ? "A request with no User-Agent, which may indicate unusual access."
        : item.type === "NOTUTF"
        ? "Incorrect encoding in the transmitted data."
        : item.type === "BLOCKED"
        ? "A request blocked by the security system."
        : "Other anomalies detected.",
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", p: 1 }}>
      <Box sx={{ color: "#8055a2", fontSize: "14px", mb: 1 }}>REQUEST ANOMALIES</Box>
      <Box sx={{ fontSize: "8px", mb: 1 }}>
        Anomalous behaviors within request headers.
      </Box>

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        {boxes.map((box, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              bgcolor: box.color,
              borderRadius: "8px",
              width: "120px",
              height: "50px",
              color: "#fff",
              fontSize: "10px",
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
            <Box>
              <Box sx={{ fontWeight: 600 }}>{box.label}</Box>
              <Box>{box.value}</Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ height: "200px", mb: 2, width: "85%" }}>
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

export default RequestAnomalies;
