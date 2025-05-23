'use client';

import { useTokenValidation } from '@/common/hooks/useTokenValidation';
import { ReactNode } from 'react';

interface TokenValidatorProps {
  children: ReactNode;
}

/**
 * Component xử lý validation token từ URL
 * Được bao bọc xung quanh ứng dụng hoặc layout cần xác thực
 */
export const TokenValidator = ({ children }: TokenValidatorProps) => {
  // Sử dụng hook để xử lý token từ URL
  const { isValidating, error } = useTokenValidation();

  // Nếu đang xử lý token, hiển thị loading
  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Nếu có lỗi, có thể hiển thị thông báo lỗi hoặc tiếp tục render app
  // Ở đây chúng ta tiếp tục render app vì navigation đã được xử lý trong hook
  return <>{children}</>;
};
