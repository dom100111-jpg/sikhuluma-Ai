import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminInsights() {
  const [stats, setStats] = useState({
    totalDictionaryWords: 0,
    totalCommunityWords: 0,
    approvedCount: 0,
    pendingCount: 0,
    deletedCount: 0,
  });

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch both files
        const dictRes = await fetch("/siswatiDictionary.json");
        const dictData = await dictRes.json();
        const commRes = await fetch("/community_submissions.json");
        const commData = await commRes.json();

        // Calculate totals
        const totalDictionaryWords = Object.keys(dictData).length;
        const totalCommunityWords = commData.length;
        const approvedCount = commData.filter((w) => w.status === "approved").length;
        const pendingCount = commData.filter((w) => w.status === "pending").length;
        const deletedCount = commData.filter((w) => w.status === "deleted").length;

        setStats({
          totalDictionaryWords,
          totalCommunityWords,
          approvedCount,
          pendingCount,
          deletedCount,
        });

        // Generate sample graph data (simulate submissions by day)
        const today = new Date();
        const mockGraph = Array.from({ length: 7 }).map((_, i) => {
          const day = new Date(today);
          day.setDate(today.getDate() - (6 - i));
          return {
            date: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            submissions: Math.floor(Math.random() * 5) + 1,
          };
        });
        setGraphData(mockGraph);
      } catch (err) {
        console.error("Error loading insights:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2 style={{ color: "#004aad" }}>📊 Admin Insights Panel</h2>
      <p>Overview of Sikhuluma AI activity and community growth</p>

      {/* Stats Summary Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {[
          { label: "Dictionary Words", value: stats.totalDictionaryWords, color: "#004aad" },
          { label: "Community Words", value: stats.totalCommunityWords, color: "#43a047" },
          { label: "Approved", value: stats.approvedCount, color: "#2196f3" },
          { label: "Pending", value: stats.pendingCount, color: "#f9a825" },
          { label: "Deleted", value: stats.deletedCount, color: "#e53935" },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: item.color,
              color: "white",
              borderRadius: "10px",
              padding: "20px",
              minWidth: "150px",
              boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ margin: 0 }}>{item.value}</h3>
            <p style={{ margin: 0 }}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* Activity Graph */}
      <div style={{ marginTop: "50px", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="submissions"
              stroke="#004aad"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
