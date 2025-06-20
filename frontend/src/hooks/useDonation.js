// hooks/useDonation.js - Custom hook for donation-related operations
import { useApi, useAsyncApi } from './useApi';
import donationService from '../services/donationService';

export const useDonationHistory = () => {
  return useApi(donationService.getMyDonationHistory);
};

export const useAllDonationRequests = () => {
  return useApi(donationService.getAllDonationRequests);
};

export const useDonationActions = () => {
  const { loading, error, execute, clearError } = useAsyncApi();

  const requestDonation = () => execute(donationService.requestDonation);
  
  const updateDonationStatus = (requestId, statusData) => 
    execute(donationService.updateDonationStatus, requestId, statusData);
    
  const recordHealthCheck = (donationId, healthCheckData) =>
    execute(donationService.recordHealthCheck, donationId, healthCheckData);
    
  const recordBloodCollection = (donationId, collectionData) =>
    execute(donationService.recordBloodCollection, donationId, collectionData);
    
  const recordTestResult = (donationId, testResultData) =>
    execute(donationService.recordTestResult, donationId, testResultData);

  return {
    loading,
    error,
    clearError,
    requestDonation,
    updateDonationStatus,
    recordHealthCheck,
    recordBloodCollection,
    recordTestResult
  };
};
