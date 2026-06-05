"use client";

import { Clock8, MoveLeft, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useOtpTimer } from "../hooks/useOtpTimer";

interface VerifyOtpFormProps {
  phone: string;
  isLoading: boolean;
  onVerify: (code: string) => void;
  onBack: () => void;
  onResend: () => void;
}

export default function VerifyOtpForm({ 
  phone, 
  isLoading, 
  onVerify, 
  onBack, 
  onResend 
}: VerifyOtpFormProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { timeLeft, isActive, formatTime, resetTimer } = useOtpTimer(120);

  const isOtpComplete = otp.every(digit => digit !== "");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    resetTimer();
    setOtp(["", "", "", "", "", ""]);
    onResend();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto border border-purple-600 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <Image src="/logo/org.png" alt="Logo" width={50} height={50} loading="lazy" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50">تایید دو مرحله‌ای</h2>
        <p className="text-gray-500 text-sm mt-1">کد تایید برای</p>
        <p className="font-semibold text-blue-600 mt-1">{phone}</p>
      </div>

      <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl border-2 outline-none transition-all text-gray-800 dark:text-gray-50"
            style={{
              borderColor: digit ? "#10B981" : focusedIndex === index ? "#3B82F6" : "#E5E7EB",
            }}
          />
        ))}
      </div>

      <div className="text-center">
        {isActive ? (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Clock8 size={16} />
            <span>زمان باقیمانده</span>
            <span className="font-bold text-blue-600">{formatTime()}</span>
          </div>
        ) : (
          <button onClick={handleResend} className="text-sm text-blue-600 flex items-center gap-2 mx-auto">
            <RefreshCw size={16} /> ارسال مجدد کد
          </button>
        )}
      </div>

      <button
        onClick={() => onVerify(otp.join(""))}
        disabled={isLoading || !isOtpComplete}
        className="w-full py-3 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-xl disabled:opacity-50 transition-all hover:opacity-90"
      >
        {isLoading ? "در حال تایید..." : "تایید و ورود"}
      </button>

      <button onClick={onBack} className="w-full py-2 text-gray-500 text-sm flex items-center justify-center gap-2 hover:text-gray-700 transition-colors">
        <MoveLeft size={16} /> تغییر شماره موبایل
      </button>
    </div>
  );
}