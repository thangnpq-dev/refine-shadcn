// Refine actions

export const getApiUrl = () => {
  let apiUrl = "";
  try {
    apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  }
  catch(ex) {
    console.error('Error getting API URL:', ex);
  }
  return apiUrl;
};

export const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  return {
    error: 'An error occurred while fetching data'
  };
};
