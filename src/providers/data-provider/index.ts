"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";
import axios from "axios";
import {TEST_KEY} from "@common/constants/test";
import { DataProvider, GetListParams } from "@refinedev/core";

const API_URL = "https://dev.aioapi.buildappfast.io.vn/api";
const axiosInstance = axios.create();

// Configure axios interceptors if needed
axiosInstance.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "Content-Type": "application/json",
    "Authorization": `Bearer ${TEST_KEY}`
  };
  return config;
});

// Get the default data provider
const defaultDataProvider = dataProviderSimpleRest(API_URL, axiosInstance);

// Create a custom data provider that doesn't add query parameters
const simpleDataProvider: DataProvider = {
  ...defaultDataProvider,
  getList: async ({ resource, pagination, filters, sorters, meta }: GetListParams) => {
    console.log(`Fetching resource: ${resource}`);
    const url = `${API_URL}/${resource}`;
    
    try {
      // Make request without query parameters
      const response = await axiosInstance.get(url);
      console.log('API Response:', response);
      
      // Log the raw data for debugging
      const rawData = response.data;
      console.log('Raw data from API:', rawData);
      
      // Ensure data is always an array
      let responseData: any[] = [];
      
      // Handle the specific API format where data is nested in data.data
      if (rawData && rawData.data && Array.isArray(rawData.data.data)) {
        responseData = rawData.data.data;
        console.log('Data extracted from data.data with length:', responseData.length);
      } else if (Array.isArray(rawData)) {
        responseData = rawData;
        console.log('Data is already an array with length:', responseData.length);
      } else if (rawData && Array.isArray(rawData.data)) {
        responseData = rawData.data;
        console.log('Data extracted from data property with length:', responseData.length);
      } else if (rawData && typeof rawData === 'object') {
        // If it's an object but not an array, convert to array with this single item
        responseData = [rawData];
        console.log('Data converted from single object to array');
      }
      
      // If we have a sample, log it for structure inspection
      if (responseData.length > 0) {
        console.log('Sample data item:', responseData[0]);
      }
      
      // Extract total from the nested structure or fallback to array length
      const total = (rawData.data && rawData.data.total) || rawData.total || responseData.length || 0;
      console.log('Total count:', total);
      
      return {
        data: responseData,
        total: total,
      };
    } catch (error) {
      console.error('Error in getList:', error);
      throw error;
    }
  },
};

// Export the data provider with proper format for Refine context
export const dataProvider = {
  default: simpleDataProvider,
};