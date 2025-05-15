
import "./language/language_translation.jsx";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, GoalProvider, ModaltriggerProvider } from "./contex/context-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Performance Management System",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <GoalProvider>
        <ModaltriggerProvider>
          <html lang="en">
            <body className={inter.className}>{children}</body>
          </html>
        </ModaltriggerProvider>
      </GoalProvider>
    </AuthProvider>
  );
}
