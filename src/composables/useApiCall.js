import { getCurrentInstance } from 'vue'

export function useApiCall() {
  const { proxy } = getCurrentInstance()

  const apiCall = (
    method,
    url,
    {
      headers = {},
      params = {},
      data = {},
      lookUpKey = '',
      onSuccess = null,
      onFailure = null,
      onFinally = null,
      responseType = 'json',
      onUploadProgress = null,
      onDownloadProgress = null,
      isTokenRequired = true,
      cancel = false,
    } = {}
  ) => {
    return proxy.$api_call(method, url, {
      headers,
      params,
      data,
      lookUpKey,
      onSuccess,
      onFailure,
      onFinally,
      responseType,
      onUploadProgress,
      onDownloadProgress,
      isTokenRequired,
      cancel,
    })
  }

  return {
    apiCall,
    api: proxy.$api
  }
}
