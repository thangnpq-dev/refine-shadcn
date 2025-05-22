'use client';

import { ENDPOINT_RESOURCES } from '@/common/constants/app-resources';
import { NAMESPACES } from '@/common/constants/namespace';
import { UserStatus } from '@/common/enum/user-status.enum';
import { NUser } from '@/common/interfaces/user';
import { CommonTable } from '@/components/framework/CustomTable';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CrudFilter, useGetIdentity, useNavigation, useTranslation } from '@refinedev/core';
import { Card } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { Trash, Edit, UserCheck, UserX, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type UserTableProps = {
  defaultFilters: CrudFilter[];
  filters?: CrudFilter[];
  key: string;
};

const useUpdateUserStatus = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onUpdateStatus = async ({ userId, status }: { userId: string, status: UserStatus }) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulating success
      toast.success(`User status updated to ${status}`);

      // In a real implementation, you would call your API here
      // const response = await apiClient.put(`/users/${userId}`, { status });

      setIsLoading(false);
      return true;
    } catch (error) {
      toast.error("Failed to update user status");
      setIsLoading(false);
      return false;
    }
  };

  return {
    isLoading,
    onUpdateStatus,
  };
};

// Định nghĩa component TestPage với props
// Component sử dụng props để nhận dữ liệu từ cha
export const UserManagementTable: React.FC<UserTableProps> = ({
  key,
  defaultFilters,
  filters: propFilters,
}) => {
  const [mounted, setMounted] = useState(false);

  const { isLoading: isUpdating, onUpdateStatus: updateStatus } = useUpdateUserStatus();
  const navigator = useNavigation();
  const { translate } = useTranslation();
  const { data: identity } = useGetIdentity<NUser.IUserIdentity>();

  const onUpdateStatus = (useId: string, status: UserStatus) => {
    updateStatus({
      userId: useId,
      status: status,
    });
  };


  const renderActions = (_: any, record: NUser.IUser) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] p-2">
          <DropdownMenuItem 
            onClick={() => navigator.push(`edit/${record.id}`)}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-secondary"
          >
            <Edit className="h-4 w-4 text-gray-500" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onUpdateStatus(record.id,
              record.status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE
            )}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-secondary"
          >
            {record.status === UserStatus.ACTIVE ? (
              <>
                <UserX className="h-4 w-4 text-red-500" />
                <span>Deactivate</span>
              </>
            ) : (
              <>
                <UserCheck className="h-4 w-4 text-green-500" />
                <span>Activate</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const getActionItems = (record: NUser.IUser): ItemType[] => {
    const items: ItemType[] = [
      {
        key: 'edit',
        label: 'Edit',
        icon: <Edit className="h-4 w-4 mr-2" />,
      },
      {
        key: 'delete',
        label: 'Delete',
        icon: <Trash className="h-4 w-4 mr-2" />,
        danger: true,
      },
    ];

    // Add status update options based on current status
    if (record.status === UserStatus.ACTIVE) {
      items.push({
        key: 'deactivate',
        label: 'Deactivate',
        icon: <UserX className="h-4 w-4 mr-2" />,
      });
    } else {
      items.push({
        key: 'activate',
        label: 'Activate',
        icon: <UserCheck className="h-4 w-4 mr-2" />,
      });
    }

    return items;
  };

  const getColumns = ({ getColumnSearchProps }: any) => [
    {
      title: translate('label.full_name', { ns: NAMESPACES.USER }),
      dataIndex: 'fullName',
      key: 'fullName',
      ...getColumnSearchProps('fullName'),
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: translate('label.phone', { ns: NAMESPACES.USER }),
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: translate('label.role', { ns: NAMESPACES.USER }),
      dataIndex: 'role',
      key: 'role',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: translate('label.status', { ns: NAMESPACES.USER }),
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      render: (status: UserStatus) => (
        <span className={status === UserStatus.ACTIVE ? 'text-green-500' : 'text-red-500'}>
          {status === UserStatus.ACTIVE ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      title: translate('label.address', { ns: NAMESPACES.USER }),
      key: 'address',
      render: (_: any, record: NUser.IUser) => (
        <span>
          {[record.street, record.ward, record.district, record.province]
            .filter(Boolean)
            .join(', ')}
        </span>
      ),
    },
    {
      title: translate('label.created_at', { ns: NAMESPACES.USER }),
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: translate('action'),
      key: 'operation',
      fixed: 'right',
      align: 'center',
      width: 100,
      onCell: () => ({
        onClick: (event: any) => {
          event.stopPropagation();
        },
      }),
      render: renderActions,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Manage users and their statuses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CommonTable<NUser.IUser>
          resource={ENDPOINT_RESOURCES.USER}
          dataProviderName="default"
          key={key}
          defaultFilters={defaultFilters}
          filters={propFilters}
          columns={getColumns}
          onRowClick={(record: NUser.IUser) => {
            console.log('Row clicked:', record);
            // let url = `edit/${record.id}`;
            // navigator.push(url);
          }}
          additionalParams={{
            meta: { kind: 'user' },
            onRefresh: () => {
              console.log('Refreshing data...');
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

// Default export for Next.js page
export default function TestPage() {
  // Default values for props
  const key = 'user-table';
  const defaultFilters: CrudFilter[] = [];
  const propFilters: CrudFilter[] | undefined = undefined;
  
  // Log output to see what data is being received
  useEffect(() => {
    console.log('ENDPOINT_RESOURCES.USER:', ENDPOINT_RESOURCES.USER);
    // Directly fetch user data to see the actual response
    fetch('https://dev.aioapi.buildappfast.io.vn/api/v1/users')
      .then(response => response.json())
      .then(data => {
        console.log('Direct API response:', data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  
  return <UserManagementTable key={key} defaultFilters={defaultFilters} filters={propFilters} />;
}
