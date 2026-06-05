import { LucideIcon } from "lucide-react";

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  action?: () => void;
  danger?: boolean;
}

export interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}