const BASE_URL = 'http://localhost:8080/api';

export const apiCall = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const isJson = response.headers.get('content-type')?.includes('application/json');
  
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(data.error || data || 'Something went wrong');
  }

  return data;
};
