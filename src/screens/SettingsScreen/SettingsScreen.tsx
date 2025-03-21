import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Switch } from "../../components/ui/switch/Switch";
import { EyeIcon, TrashIcon } from "lucide-react";

export const SettingsScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="col-span-12">
      <div className="p-6 max-w-[1440px] mx-auto">
        <div className="mb-8">
          <h1 className="text-[32px] font-medium text-[#060606] tracking-[0.16px]">
            Settings
          </h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="mb-12">
          <h2 className="text-xl font-medium mb-2">Profile</h2>
          <p className="text-gray-600 text-sm mb-6">Set your account details</p>

          <div className="flex gap-12">
            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-sm mb-2">Name</label>
                <Input
                  defaultValue="Dan Simth"
                  className="h-12 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">E-mail</label>
                <Input
                  type="email"
                  defaultValue="abcdefgh@domain.com"
                  className="h-12 rounded-lg"
                />
              </div>
            </div>

            <div className="w-[200px] flex flex-col items-center">
              <div className="relative">
                <img
                  src="/ellipse-3226.png"
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  <Button
                    variant="outline"
                    className="h-8 px-3 py-1 bg-white text-[#577bff] border-[#577bff] text-sm rounded-full"
                  >
                    Edit Photo
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0 bg-white border-red-500 rounded-full"
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="mb-12">
          <h2 className="text-xl font-medium mb-2">Change Password</h2>
          <p className="text-gray-600 text-sm mb-6">Change your account password</p>

          <div className="max-w-[600px] space-y-6">
            <div>
              <label className="block text-sm mb-2">Current Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="h-12 rounded-lg pr-12"
                  value="••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">New Password</label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  className="h-12 rounded-lg pr-12"
                  value="••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Confirm New Password</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  className="h-12 rounded-lg pr-12"
                  value="••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${true ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-600">Must contain at least 8 characters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${true ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-600">Must contain at least a number</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${true ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-600">There should be no spaces</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${false ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-600">Must contain at least one uppercase and one lowercase letter</span>
              </div>
            </div>

            <Button className="w-full h-12 bg-[#577bff] hover:bg-[#4a69d9] text-white rounded-lg">
              Update Password
            </Button>
          </div>
        </div>

        {/* Push Notifications Section */}
        <div>
          <h2 className="text-xl font-medium mb-2">Push Notifications</h2>
          <p className="text-gray-600 text-sm mb-6">ON/OFF your notifications alert</p>

          <div className="flex items-center gap-4">
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
            <span className="text-sm font-medium">
              {notificationsEnabled ? "ON" : "OFF"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};