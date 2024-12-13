import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js/auto";
import { Box } from "@mui/material";
import { FiArrowUpRight } from "react-icons/fi";
import { StateContext } from "@/context/page";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ResponseAnomalies({ responseData }) {
  const { state } = useContext(StateContext);
  const from = state.from;
  const until = state.until;


  const trimmedData = responseData.map((item) => ({
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
      item.type === "HTTP4XX"
        ? "#5271ff"
        : item.type === "HTTP403"
        ? "#5ce1e6"
        : item.type === "HTTP404"
        ? "#ffbe59"
        : item.type === "HTTP5XX"
        ? "#4BC0C0"
        : item.type === "HTTP500"
        ? "#e85d75"
        : item.type === "HTTP503"
        ? "#9dcf00"
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
      item.type === "HTTP4XX"
        ? "#5271ff"
        : item.type === "HTTP403"
        ? "#5ce1e6"
        : item.type === "HTTP404"
        ? "#ffbe59"
        : item.type === "HTTP5XX"
        ? "#4BC0C0"
        : item.type === "HTTP500"
        ? "#e85d75"
        : item.type === "HTTP503"
        ? "#9dcf00"
        : "#e8c3b9",
    label: item.type,
    value: item.summaryCount,
    description:
      item.type === "HTTP4XX"
        ? "Client-side issues, such as 404 (not found)."
        : item.type === "HTTP403"
        ? "Access denied."
        : item.type === "HTTP404"
        ? "Page not found."
        : item.type === "HTTP5XX"
        ? "Server-side issues."
        : item.type === "HTTP500"
        ? "Internal server error."
        : item.type === "HTTP503"
        ? "Server temporarily unavailable."
        : "Other response anomalies.",
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", p: 1 }}>
      <Box sx={{ color: "#8055a2", fontSize: "14px", mb: 1 }}>RESPONSE ANOMALIES</Box>
      <Box sx={{ fontSize: "8px", mb: 1 }}>Client and server error codes.</Box>

      <Box sx={{ display: "flex",gap: 1,}}>
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
        padding: "0 8px",
        height: "50px",
        color: "#fff",
        fontSize: "10px",
        flexShrink: 0,
        textOverflow: "ellipsis",
        
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
          flexShrink: 0,
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
        <Box
          sx={{
            fontWeight: 600,
            fontSize: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "80px",
          }}
        >
          {box.label}
        </Box>
        <Box sx={{ fontSize: "10px" }}>{box.value}</Box>
      </Box>
    </Box>
  ))}
</Box>


      <Box sx={{ display: "flex" }}>
        <Box sx={{ height: "200px",  width: "85%" }}>
          <Bar data={data} options={options} />
        </Box>
        <Box sx={{ width: "20%", display: "flex", flexDirection: "column", gap: 1 }}>
  {boxes.map((box, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: "12px",
          height: "12px",
          bgcolor: box.color,
          borderRadius: "50%",
        }}
      ></Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ fontSize: "10px", fontWeight: 600 }}>{box.label}</Box>
        <Box sx={{ fontSize: "8px", color: "#666" }}>{box.description}</Box>
      </Box>
    </Box>
  ))}
</Box>

      </Box>
    </Box>
  );
}

export default ResponseAnomalies;
