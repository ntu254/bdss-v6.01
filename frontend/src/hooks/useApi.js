// src/hooks/useApi.js
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

// Hook này có thể được mở rộng để xử lý các yêu cầu API chung
// Ví dụ: const { data, error, loading, request } = useApi(apiServiceFunction);
// await request(params);

export const useApi = (apiFunc) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        setData(null);
        const toastId = toast.loading('Đang xử lý yêu cầu...');
        try {
            const result = await apiFunc(...args);
            setData(result);
            toast.success('Yêu cầu thành công!', { id: toastId });
            return result;
        } catch (err) {
            setError(err);
            toast.error(`Lỗi: ${err.message || 'Đã có lỗi xảy ra.'}`, { id: toastId });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunc]);

    return { data, error, loading, request };
};

// Hook for async operations without predefined API function
export const useAsyncApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (apiFunc, ...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiFunc(...args);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return { loading, error, execute, clearError };
};

export default useApi;