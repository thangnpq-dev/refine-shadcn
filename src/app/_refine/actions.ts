// Refine actions

export const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';
};

export const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  return {
    error: 'An error occurred while fetching data'
  };
};
