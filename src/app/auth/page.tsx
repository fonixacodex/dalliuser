"use client";

import dynamic from "next/dynamic";
import SendOtpForm from "@/features/auth/components/SendOtpForm";
import VerifyOtpForm from "@/features/auth/components/VerifyOtpForm";
import AuthCarousel from "@/features/auth/components/AuthCarousel";
import { useAuth } from "@/features/auth/hooks/useAuth";

// بارگذاری ThemeToggle فقط در سمت کلاینت
const ThemeToggle = dynamic(
  () => import("@/shared/ui/toggle/ThemeToggle"),
  { ssr: false }
);

export default function AuthPage() {
  const { step, phone, isLoading, handleSendOtp, handleVerifyOtp, handleBack } = useAuth();

  const handleResend = () => {
    handleSendOtp(phone);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 min-h-150 flex flex-col justify-center">
            {step === "send" ? (
              <SendOtpForm isLoading={isLoading} onSubmit={handleSendOtp} />
            ) : (
              <VerifyOtpForm
                phone={phone}
                isLoading={isLoading}
                onVerify={handleVerifyOtp}
                onBack={handleBack}
                onResend={handleResend}
              />
            )}
          </div>

          <div className="hidden lg:block">
            <AuthCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}