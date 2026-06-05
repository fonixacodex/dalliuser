// app/layout.tsx
import { ThemeProvider } from "@/components/darkmoode/ThemeProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
       
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}