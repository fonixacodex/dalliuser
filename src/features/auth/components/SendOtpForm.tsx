"use client";

import {Phone, Check} from "lucide-react";
import Image from "next/image";
import {useState} from "react";
import toast from "react-hot-toast";
import {usePhoneValidation} from "../hooks/usePhoneValidation";
import Link from "next/link";

interface SendOtpFormProps {
    isLoading: boolean;
    onSubmit: (phone: string) => void;
}

export default function SendOtpForm({isLoading, onSubmit}: SendOtpFormProps) {
    const {phone, error, isValid, handlePhoneChange} = usePhoneValidation();
    const [agreeTerms, setAgreeTerms] = useState(false);
    // const [showTerms, setShowTerms] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid && agreeTerms) {
            onSubmit(phone);
        } else if (!agreeTerms) {
            toast.error("لطفاً قوانین و مقررات را بپذیرید");
        } else if (!isValid) {
            toast.error("شماره موبایل نامعتبر است");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            <div className="text-center">
                <div
                    className="w-16 h-16 mx-auto border border-purple-600   bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4">
                    <Image src="/logo/org.png" alt="Logo" width={50} height={50}

                           loading="lazy"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    خوش آمدید
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    برای ورود شماره موبایل خود را وارد کنید
                </p>
            </div>


            <div className="space-y-2">
                <div className="relative">
                    <Phone
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="09123456789"
                        className="w-full px-10 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none transition-all text-center"
                        style={{
                            borderColor: error
                                ? "#EF4444"
                                : isValid
                                    ? "#10B981"
                                    : isFocused
                                        ? "#3B82F6"
                                        : "#E5E7EB",
                        }}
                        inputMode="numeric"
                        dir="ltr"
                    />
                    {isValid && (
                        <Check
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                            size={18}
                        />
                    )}
                </div>
                {error && <p className="text-xs text-red-500 text-center">{error}</p>}
            </div>


            <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <button
                    type="button"
                    onClick={() => setAgreeTerms(!agreeTerms)}
                    className="flex items-center gap-2"
                >
                    <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${agreeTerms ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
                    >
                        {agreeTerms && <Check size={12} className="text-white"/>}
                    </div>
                    <span className="text-sm text-gray-800 dark:text-gray-50">قوانین را می‌پذیرم</span>
                </button>
                <Link
                    href="/terms"
                    target="_blank"
                    className="text-xs text-blue-500 hover:underline"
                >
                    مشاهده قوانین
                </Link>
            </div>

            <button
                type="submit"
                disabled={isLoading || !isValid || !agreeTerms}
                className="w-full py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl   disabled:opacity-50 transition-all hover:scale-[1.02]"
            >
                {isLoading ? "در حال ارسال..." : "دریافت کد تایید"}
            </button>
        </form>
    );
}
