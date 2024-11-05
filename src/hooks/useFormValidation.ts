import { useState } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message: string;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string) => {
    const rule = rules[name];
    if (!rule) return true;

    if (rule.required && !value) {
      setErrors(prev => ({
        ...prev,
        [name]: 'Это поле обязательно'
      }));
      return false;
    }

    if (rule.minLength && value.length < rule.minLength) {
      setErrors(prev => ({
        ...prev,
        [name]: `Минимальная длина ${rule.minLength} символов`
      }));
      return false;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      setErrors(prev => ({
        ...prev,
        [name]: `Максимальная длина ${rule.maxLength} символов`
      }));
      return false;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      setErrors(prev => ({
        ...prev,
        [name]: rule.message
      }));
      return false;
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  };

  const validateForm = (data: { [key: string]: any }) => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      const value = String(data[fieldName] || '');
      if (!validateField(fieldName, value)) {
        isValid = false;
        newErrors[fieldName] = errors[fieldName] || rules[fieldName].message;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    validateField,
    validateForm
  };
};

export default useFormValidation;