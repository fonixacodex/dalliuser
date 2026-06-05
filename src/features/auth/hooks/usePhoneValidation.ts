"use client";

import { useState, useCallback } from "react";

export const usePhoneValidation = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validatePhone = useCallback((value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '');
    
    if (!cleaned) {
      setError("");
      setIsValid(false);
      return false;
    }
    
    if (cleaned.length !== 11) {
      setError("شماره موبایل باید 11 رقم باشد");
      setIsValid(false);
      return false;
    }
    
    if (!cleaned.startsWith("09")) {
      setError("شماره موبایل باید با 09 شروع شود");
      setIsValid(false);
      return false;
    }
    
    setError("");
    setIsValid(true);
    return true;
  }, []);

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '').slice(0, 11);
    setPhone(cleaned);
    if (cleaned.length === 11) {
      validatePhone(cleaned);
    } else {
      setError("");
      setIsValid(false);
    }
  };

  return {
    phone,
    error,
    isValid,
    handlePhoneChange,
    validatePhone,
  };
};