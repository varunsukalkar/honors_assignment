import { useState, useEffect } from "react";
import axios from "axios";
export const useAxios = (url, method, data = null) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    try {
      const res = await axios[method](url, data);
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url, method, data]);
  return { response, error, loading };
};
