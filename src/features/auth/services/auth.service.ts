import { SendOtpRequest, VerifyOtpRequest, AuthResponse } from "../types/auth.types";

export const authService = {
  async sendOtp(phone: string): Promise<AuthResponse> {
    // شبیه‌سازی درخواست API
    return new Promise((resolve) => {
      setTimeout(() => {
        // در حالت واقعی: fetch('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone }) })
        if (phone.length === 11 && phone.startsWith("09")) {
          resolve({
            success: true,
            message: "کد تایید ارسال شد",
          });
        } else {
          resolve({
            success: false,
            message: "شماره موبایل نامعتبر است",
          });
        }
      }, 1000);
    });
  },

  async verifyOtp(phone: string, code: string): Promise<AuthResponse> {
    // شبیه‌سازی درخواست API
    return new Promise((resolve) => {
      setTimeout(() => {
        // در حالت واقعی: fetch('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone, code }) })
        if (code === "123456") {
          resolve({
            success: true,
            message: "ورود موفقیت‌آمیز",
            token: "fake-jwt-token",
            user: {
              id: "1",
              phone,
              name: "کاربر دالی",
            },
          });
        } else {
          resolve({
            success: false,
            message: "کد تایید نامعتبر است",
          });
        }
      }, 1000);
    });
  },
};