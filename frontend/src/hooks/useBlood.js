// hooks/useBlood.js - Custom hook for blood-related operations
import { useApi } from './useApi';
import { bloodService } from '../services/bloodService';

export const useBloodTypes = () => {
  return useApi(bloodService.getBloodTypes);
};

export const useBloodCompatibility = (page = 0, size = 10, sort = 'id,asc') => {
  return useApi(() => bloodService.getBloodCompatibility(page, size, sort), [page, size, sort]);
};

export const useAllBloodCompatibility = () => {
  return useApi(bloodService.getAllBloodCompatibility);
};
