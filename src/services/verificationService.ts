import { User } from '../types';

export const verifyDocument = async (file: File): Promise<{ valid: boolean; data?: any }> => {
  // In a real app, this would make an API call to verify the document
  // For demo purposes, we'll simulate the verification process
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate document verification
      const valid = Math.random() > 0.3;
      resolve({
        valid,
        data: valid ? {
          fullName: 'Иван Петров',
          documentNumber: '1234 567890',
          issueDate: '2020-01-01'
        } : undefined
      });
    }, 2000);
  });
};

export const verifyLawyerLicense = async (file: File): Promise<{ valid: boolean; data?: any }> => {
  // Simulate lawyer license verification
  return new Promise((resolve) => {
    setTimeout(() => {
      const valid = Math.random() > 0.3;
      resolve({
        valid,
        data: valid ? {
          licenseNumber: 'ЮР-123456',
          issueDate: '2019-01-01',
          expiryDate: '2024-01-01',
          status: 'active'
        } : undefined
      });
    }, 2000);
  });
};