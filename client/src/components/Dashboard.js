import React, { useEffect, useState } from "react";
import ChartContainer from "./ChartContainer";
import AnomalyTable from "./AnomalyTable";
import { useNavigate, useParams } from "react-router";
import { SERVER_URL } from "../constants/constant";
import InfoTable from "./InfoTable";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [chartsData, setChartsData] = useState([]);
  const [anomalyData, setAnomalyData] = useState([]);
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate("/");
  };
  const params = useParams();
  const getAnomalyTable = async () => {
    const data = await fetch(`${SERVER_URL}/api/tower/${params.id}`);
    const towerData = await data.json();
    setChartsData(towerData?.chartsData);
    setAnomalyData(towerData?.anomalyData);
  };
  useEffect(() => {
    getAnomalyTable();
    const timer = setInterval(() => {
      getAnomalyTable();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => handleBackButton()}
        >
          Back
        </button>
        {chartsData.length > 0 ? (
          <span className={styles.cityText}>{chartsData[0].city}</span>
        ) : (
          <span className={styles.cityText}>Loading...</span>
        )}
      </div>
      <ChartContainer data={chartsData}></ChartContainer>
      <AnomalyTable data={anomalyData}></AnomalyTable>
      <InfoTable tableStyle={styles.infoTableDashboardContainer}></InfoTable>
    </div>
  );
};

export default Dashboard;
