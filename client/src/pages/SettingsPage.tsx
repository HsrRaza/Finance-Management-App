import React from "react";
import { Sun, Moon, LogOut, Shield, Settings as SettingsIcon } from "lucide-react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useUIStore } from "../store/uiStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useUIStore();

  const userName = user?.name || "User";
  const userEmail = user?.email || "user@financetracker.com";
  const avatarUrl =
    user?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=1F5C4A&color=fff`;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Editorial Header */}
      <div className="pb-4 border-b border-[#E2E0D8] dark:border-[#2E3742]">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1F5C4A] dark:text-[#34A887] uppercase tracking-widest mb-0.5">
          <SettingsIcon className="h-3.5 w-3.5" />
          Account Administration
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17212B] dark:text-[#F3F4F6]">
          Account Settings
        </h1>
      </div>

      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Summary</CardTitle>
          <CardDescription>View your user account information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={avatarUrl}
              alt={userName}
              className="h-14 w-14 rounded-full border border-[#E2E0D8] dark:border-[#2E3742] object-cover"
            />
            <div>
              <h3 className="text-base font-bold text-[#17212B] dark:text-[#F3F4F6]">{userName}</h3>
              <p className="text-xs text-[#66717C] dark:text-[#9CA3AF]">{userEmail}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance & Theme Card */}
      <Card>
        <CardHeader>
          <CardTitle>Display Mode</CardTitle>
          <CardDescription>Select your application visual theme.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#EFEEE8] dark:bg-[#2A333D] text-[#1F5C4A] dark:text-[#34A887] border border-[#E2E0D8] dark:border-[#2E3742]">
              {theme === "dark" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
            </div>
            <div>
              <p className="text-sm font-bold text-[#17212B] dark:text-[#F3F4F6]">Theme Mode</p>
              <p className="text-xs text-[#66717C] dark:text-[#9CA3AF]">Currently active: {theme} mode</p>
            </div>
          </div>

          <Button variant="secondary" onClick={toggleTheme}>
            Toggle Theme
          </Button>
        </CardContent>
      </Card>

      {/* Security & Logout Card */}
      <Card>
        <CardHeader>
          <CardTitle>Session Security</CardTitle>
          <CardDescription>Manage active login credentials.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#FDF2F2] dark:bg-[#2C1A1A] text-[#B94A4A] dark:text-[#E06C6C] border border-[#F4D4D4] dark:border-[#4A2424]">
              <Shield className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#17212B] dark:text-[#F3F4F6]">Sign Out</p>
              <p className="text-xs text-[#66717C] dark:text-[#9CA3AF]">Safely end your current session.</p>
            </div>
          </div>

          <Button variant="danger" onClick={logout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
