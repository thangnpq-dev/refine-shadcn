import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TokenService } from '@/lib/api/services';

interface UseTokenValidationResult {
  isValidating: boolean;
  isValid: boolean;
  error: string | null;
}

/**
 * Hook xử lý việc đọc token từ URL và xác thực
 */
export const useTokenValidation = (): UseTokenValidationResult => {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const validateTokenFromUrl = async () => {
      const token = searchParams.get('token');
      
      // Nếu không có token trong URL, không cần xử lý
      if (!token) return;
      
      try {
        setIsValidating(true);
        setError(null);
        
        // Gọi API để xác thực token
        const result = await TokenService.validateToken(token);
        
        if (result.success) {
          setIsValid(true);
          
          // Chuyển hướng đến trang dashboard hoặc trang chủ mà không có token trong URL
          // Điều này để tránh việc token bị lộ trong history hoặc bookmark
          const currentPath = window.location.pathname;
          router.replace(currentPath);
        } else {
          setIsValid(false);
          setError('Token is invalid or expired');
          // Xóa token hiện tại nếu có
          TokenService.removeToken();
          // Chuyển hướng đến trang đăng nhập
          router.replace('/login');
        }
      } catch (err) {
        setIsValid(false);
        setError('An error occurred during token validation');
        // Xóa token hiện tại nếu có
        TokenService.removeToken();
        // Chuyển hướng đến trang đăng nhập
        router.replace('/login');
      } finally {
        setIsValidating(false);
      }
    };
    
    validateTokenFromUrl();
  }, [searchParams, router]);
  
  return { isValidating, isValid, error };
};
