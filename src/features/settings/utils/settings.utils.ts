import { MenuItem } from "../types/settings.types";

 
export const saveSetting = (key: string, value: any): void => {
  if (typeof window !== "undefined") {
    const settings = JSON.parse(localStorage.getItem("app_settings") || "{}");
    settings[key] = value;
    localStorage.setItem("app_settings", JSON.stringify(settings));
  }
};

 
export const getSetting = (key: string, defaultValue: any = null): any => {
  if (typeof window !== "undefined") {
    const settings = JSON.parse(localStorage.getItem("app_settings") || "{}");
    return settings[key] !== undefined ? settings[key] : defaultValue;
  }
  return defaultValue;
};

 
export const removeSetting = (key: string): void => {
  if (typeof window !== "undefined") {
    const settings = JSON.parse(localStorage.getItem("app_settings") || "{}");
    delete settings[key];
    localStorage.setItem("app_settings", JSON.stringify(settings));
  }
};

 
export const clearAllSettings = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("app_settings");
  }
};

 
export const getSystemTheme = (): "dark" | "light" => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
};

 
export const applyTheme = (isDark: boolean): void => {
  if (typeof document !== "undefined") {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};

 
export const saveTheme = (isDark: boolean): void => {
  saveSetting("theme", isDark ? "dark" : "light");
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

 
export const getSavedTheme = (): "dark" | "light" | null => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return null;
};

 
export const getCurrentTheme = (): "dark" | "light" => {
  const saved = getSavedTheme();
  if (saved) return saved;
  return getSystemTheme();
};
 
export const formatSettingDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("fa-IR");
};

 
export const filterMenuBySearch = (menus: MenuItem[], searchTerm: string): MenuItem[] => {
  if (!searchTerm.trim()) return menus;
  const term = searchTerm.toLowerCase();
  return menus.filter(menu => 
    menu.label.toLowerCase().includes(term)
  );
};

 
export const groupMenuByCategory = (menus: MenuItem[]): Record<string, MenuItem[]> => {
  const categories: Record<string, MenuItem[]> = {
    account: [],
    privacy: [],
    support: [],
    other: [],
  };

  menus.forEach(menu => {
    if (menu.label.includes("حساب") || menu.label.includes("پروفایل")) {
      categories.account.push(menu);
    } else if (menu.label.includes("حریم") || menu.label.includes("امنیت")) {
      categories.privacy.push(menu);
    } else if (menu.label.includes("راهنما") || menu.label.includes("پشتیبانی")) {
      categories.support.push(menu);
    } else {
      categories.other.push(menu);
    }
  });

  return categories;
};

 
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

 
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

 
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

 
export const logSettingsChange = (key: string, oldValue: any, newValue: any): void => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Settings] ${key} changed from`, oldValue, "to", newValue);
  }
};

 
export const settingsToJSON = (settings: Record<string, any>): string => {
  return JSON.stringify(settings, null, 2);
};
 
export const loadSettingsFromJSON = (jsonString: string): Record<string, any> => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return {};
  }
};

 
export const resetToDefaults = (): void => {
  const defaults = {
    theme: getSystemTheme(),
    notifications: true,
    sound: true,
    language: "fa",
  };
  
  Object.entries(defaults).forEach(([key, value]) => {
    saveSetting(key, value);
  });
 
  applyTheme(defaults.theme === "dark");
};

 
export const hasSettingChanged = (oldValue: any, newValue: any): boolean => {
  return JSON.stringify(oldValue) !== JSON.stringify(newValue);
};

 
export const mergeSettings = (defaultSettings: Record<string, any>, userSettings: Record<string, any>): Record<string, any> => {
  return { ...defaultSettings, ...userSettings };
};

 
export const validateSettingValue = (key: string, value: any): boolean => {
  switch (key) {
    case "theme":
      return value === "dark" || value === "light";
    case "notifications":
    case "sound":
      return typeof value === "boolean";
    case "language":
      return ["fa", "en", "ar"].includes(value);
    default:
      return true;
  }
};