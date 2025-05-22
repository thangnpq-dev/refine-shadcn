import { formatDisplayDateTimeValue } from '@/lib/formatDateTime';
import {
  getDefaultSortOrder,
  mapAntdFilterToCrudFilter,
  mapAntdSorterToCrudSorting,
  useTable,
} from '@refinedev/antd';
import {
  CrudFilter,
  CrudFilters,
  CrudSort,
  CrudSorting,
  HttpError,
  useNavigation,
  useTranslation,
} from '@refinedev/core';
import {
  Button,
  Dropdown,
  Input,
  InputRef,
  Table,
  TableColumnType,
  TableColumnsType,
  TablePaginationConfig,
} from 'antd';
import { FilterDropdownProps, SorterResult } from 'antd/es/table/interface';
import { FilterValue } from 'antd/lib/table/interface';
import { useEffect, useMemo, useRef } from 'react';
import { DEFAULT_DATE_TIME_FORMAT } from '@/common/constants/date-time';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from '@/common/constants/pagination';

// Generic type T for the data model
type CommonTableProps<T> = {
  resource: string;
  dataProviderName: string;
  defaultFilters: CrudFilter[];
  filters?: CrudFilter[];
  columns: (TableColumnType<T> | any)[] | ((searchProps: any) => TableColumnType<T>[]);
  key: string;
  onRowClick?: (record: T) => void;
  additionalParams?: Record<string, any>;
//   initialSorters?: { field: string; order: string }[];
  initialSorters?: CrudSort[]; // Sử dụng CrudSort trực tiếp từ @refinedev/core
};

export const CommonTable = <T extends object>({
  resource,
  dataProviderName,
  key,
  defaultFilters,
  filters: propFilters,
  columns: columnsProp,
  onRowClick,
  additionalParams,
  initialSorters = [{ field: 'createdAt', order: 'asc' }],
}: CommonTableProps<T>) => {
  const searchInput = useRef<InputRef>(null);
  const navigator = useNavigation();
  const { translate } = useTranslation();

  const {
    tableQuery,
    filters,
    setCurrent,
    setSorters,
    sorters,
    setFilters,
    current,
    pageSize,
  } = useTable<T, HttpError>({
    resource,
    dataProviderName,
    initialPageSize: DEFAULT_PAGE_SIZE,
    initialCurrent: DEFAULT_PAGE_INDEX,
    filters: {
      permanent: [...defaultFilters],
    },
    sorters: {
      initial: initialSorters,
    },
    syncWithLocation: false,
    ...additionalParams,
  });

  useEffect(() => {
    if (propFilters?.length) {
      setFilters(propFilters, 'replace');
    }
  }, [propFilters]);

  const data = tableQuery?.data?.data ?? [];
  const total = tableQuery?.data?.total ?? 0;

  const onChangeTable = (
    pagination: TablePaginationConfig,
    tableFilters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    pagination.current && setCurrent(pagination.current);

    const crudSorting: CrudSorting = mapAntdSorterToCrudSorting(sorter || []);
    setSorters(crudSorting);

    const crudFilters: CrudFilters = mapAntdFilterToCrudFilter(
      tableFilters,
      filters
    );
    crudFilters.forEach((filter) => {
      if (filter.operator == 'eq') {
        filter.operator = 'contains';
      }
    });

    setFilters(crudFilters);
  };

  const getColumnSearchProps = (
    dataIndex: string
  ): TableColumnType<T> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
    }: {
      setSelectedKeys: any;
      selectedKeys: React.Key[];
      confirm: FilterDropdownProps['confirm'];
    }) => (
      <div className="p-2" onKeyDown={(e) => e.stopPropagation()}>
        <Input
          allowClear
          ref={searchInput}
          placeholder={translate('search')}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? e.target.value : [])
          }
          onPressEnter={(e) => confirm()}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <span className={filtered ? 'text-primary' : ''}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  // Handle columns based on whether they're a function or array
  const columns = useMemo(() => {
    if (typeof columnsProp === 'function') {
      return columnsProp({ getColumnSearchProps });
    }
    return columnsProp;
  }, [columnsProp]);

  return (
    <div className="custom-table-container">
      <style jsx global>{`
        /* Giảm độ đậm của đường kẻ ngăn cách cột */
        .custom-table-container .ant-table-cell {
          border-right: 1px solid rgba(0, 0, 0, 0.05) !important;
        }
        
        /* Làm nhạt đường kẻ ngang */
        .custom-table-container .ant-table-thead > tr > th {
          border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
          background-color: #f9f9f9 !important;
        }
        
        /* Làm nhạt đường kẻ giữa các hàng */
        .custom-table-container .ant-table-tbody > tr > td {
          border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
        }
        
        /* Loại bỏ đường kẻ ở cột cuối cùng */
        .custom-table-container .ant-table-cell:last-child {
          border-right: none !important;
        }
      `}</style>
      <Table
        scroll={{ x: 720 }}
        dataSource={data}
        loading={tableQuery.isFetching}
        rowKey="id"
        rowClassName="row-selector"
        columns={columns}
        pagination={{
          current,
          pageSize,
          total,
          position: ['bottomCenter'],
          showSizeChanger: false,
        }}
        onChange={onChangeTable}
        onRow={(record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
              if (onRowClick) {
                  onRowClick(record as T);
              }
            },
          };
        }}
        key={key}
      />
    </div>
  );
};