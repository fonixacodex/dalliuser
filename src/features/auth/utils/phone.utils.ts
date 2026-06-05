export const phoneUtils = {
  validate: (phone: string): boolean => {
    return /^09[0-9]{9}$/.test(phone);
  },
  
  format: (phone: string): string => {
    const cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  },
  
  getErrorMessage: (phone: string): string => {
    if (!phone) return "شماره موبایل را وارد کنید";
    if (phone.length !== 11) return "شماره موبایل باید 11 رقم باشد";
    if (!phone.startsWith("09")) return "شماره موبایل باید با 09 شروع شود";
    return "";
  },
};