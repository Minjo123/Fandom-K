import { useState, useEffect } from "react";
import { getCharts } from "../service/getApi";

const useIdolChart = (gender) => {
  const [idolRank, setIdolRank] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await getCharts(gender);
      setIdolRank(response);
      setFetchError(null); // Reset fetchError if fetching succeeds
    } catch (error) {
      console.error("Error fetching idol chart:", error);
      setFetchError(error); // Set fetchError if an error occurs
    } finally {
      setLoading(false); // Always set loading to false after fetch completes
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch when gender changes or component mounts
  }, [gender]);

  return { idolRank, loading, fetchError, fetchData };
};

export default useIdolChart;
