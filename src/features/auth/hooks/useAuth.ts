"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authService } from "../services/auth.service";
import { AuthStep } from "../types/auth.types";

export const useAuth = () => {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>("send");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = useCallback(async (userPhone: string) => {
    setIsLoading(true);
    try {
      const response = await authService.sendOtp(userPhone);
      if (response.success) {
        setPhone(userPhone);
        setStep("verify");
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("خطا در ارسال کد تایید");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleVerifyOtp = useCallback(async (code: string) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyOtp(phone, code);
      if (response.success && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        toast.success(response.message);
        router.push("/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("خطا در تایید کد");
    } finally {
      setIsLoading(false);
    }
  }, [phone, router]);

  const handleBack = useCallback(() => {
    setStep("send");
    setPhone("");
  }, []);

  return {
    step,
    phone,
    isLoading,
    handleSendOtp,
    handleVerifyOtp,
    handleBack,
  };
};