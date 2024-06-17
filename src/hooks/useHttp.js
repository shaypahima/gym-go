import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config)
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || 'failed to send request.')
  }
  return resData
}

export default function useHttp(url, config, initialValue) {
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  
  function handleResetRequest(){
    setFetchedData(initialValue)
  }
  
  const sendRequest = useCallback(async function sendRequest(configData) {
    setLoading(true)
    try {
      const data = await sendHttpRequest(url, { ...config, body: configData })
      setFetchedData(data)
    } catch (error) {
      setError(error.message || 'Something went wrong!')
    }
    setLoading(false)
  }, [url, config])

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest()

    }
  }, [sendRequest, config])

  return { fetchedData, error, loading, sendRequest, onResetRequest: handleResetRequest }
}