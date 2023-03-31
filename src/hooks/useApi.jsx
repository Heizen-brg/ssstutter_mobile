import React, { useEffect, useCallback } from "react";
import { useNoti } from "../context/NotificationContext";

const useApi = (serviceCallback) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { notification } = useNoti();
  const request = useCallback(async (...args) => {
    try {
      const response = await serviceCallback(...args);
      setLoading(true);
      setData(response.data.data);
    } catch ({ response }) {
      if (response.data) {
        setError(response.data.error);
        notification(response.data.error, "fail");
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useApi;
