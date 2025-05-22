import { DataProvider } from '@refinedev/core';
import apiClient from './axios';
import { stringify } from 'query-string';

export const dataProvider = (): DataProvider => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `/${resource}`;

    const { current = 1, pageSize = 10, mode = 'server' } = pagination ?? {};

    const queryFilters = filters
      ? filters.reduce((prev, curr) => {
          if (curr.operator === 'eq') {
            return { ...prev, [curr.field]: curr.value };
          }
          return prev;
        }, {})
      : {};

    const query: Record<string, any> = {};

    if (mode === 'server') {
      query.page = current;
      query.pageSize = pageSize;
    }

    if (sorters && sorters.length > 0) {
      query.sortBy = sorters[0].field;
      query.sortOrder = sorters[0].order;
    }

    const { data } = await apiClient.get(`${url}?${stringify({ ...query, ...queryFilters })}`);

    return {
      data: data.data || [],
      total: data.total || data.data?.length || 0,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const url = `/${resource}/${id}`;

    const { data } = await apiClient.get(url);

    return {
      data,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const url = `/${resource}`;

    const { data } = await apiClient.post(url, variables);

    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const url = `/${resource}/${id}`;

    const { data } = await apiClient.patch(url, variables);

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, meta }) => {
    const url = `/${resource}/${id}`;

    const { data } = await apiClient.delete(url);

    return {
      data,
    };
  },

  getApiUrl: () => {
    // Return the base URL of your API
    return apiClient.defaults.baseURL || '';
  },

  custom: async ({ url, method, filters, sorters, payload, query, headers, meta }) => {
    let requestUrl = `${url}?`;

    if (query) {
      requestUrl = `${requestUrl}${stringify(query)}`;
    }

    if (sorters && sorters.length > 0) {
      const sortQuery = {
        sortBy: sorters[0].field,
        sortOrder: sorters[0].order,
      };
      requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
    }

    if (filters && filters.length > 0) {
      const filterQuery = filters.reduce((prev, curr) => {
        if (curr.operator === 'eq') {
          return { ...prev, [curr.field]: curr.value };
        }
        return prev;
      }, {});

      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    let axiosResponse;
    switch (method) {
      case 'put':
      case 'post':
      case 'patch':
        axiosResponse = await apiClient[method](url, payload, {
          headers,
        });
        break;
      case 'delete':
        axiosResponse = await apiClient.delete(url, {
          data: payload,
          headers,
        });
        break;
      default:
        axiosResponse = await apiClient.get(requestUrl, {
          headers,
        });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
