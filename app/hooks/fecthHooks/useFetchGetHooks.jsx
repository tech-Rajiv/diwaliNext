import React, { useEffect, useState } from "react";

function useFetchGetHooks(url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const fetchingFn = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      setData(data?.data);
    } catch (error) {
      setError(error?.message ?? "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchingFn(url);
    }
  }, [url]);
  return {
    data,
    loading,
    error,
  };
}

export default useFetchGetHooks;
