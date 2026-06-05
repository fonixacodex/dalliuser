export type AuthStep = "send" | "verify";

export interface SendOtpRequest {
  phone: string;
}

export interface VerifyOtpRequest {
  phone: string;
  code: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    phone: string;
    name?: string;
  };
}

export interface Slide {
  image: string;
  text: string;
}

export interface OtpTimerProps {
  initialTime?: number;
  onResend?: () => void;
}