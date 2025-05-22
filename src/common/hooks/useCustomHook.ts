// Example custom hook

import { useState, useEffect } from 'react';

export const useCustomHook = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const update = (newValue: T) => {
    try {
      setLoading(true);
      setValue(newValue);
      setError(null);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(err));
    } finally {
      setLoading(false);
    }
  };

  return { value, loading, error, update };
};

export default useCustomHook;
