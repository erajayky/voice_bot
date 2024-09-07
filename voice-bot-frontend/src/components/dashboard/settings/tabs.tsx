import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserRoundCog, Wallet } from "lucide-react";
import Profile from "./profile";
import ChangePassword from "./changePassword";
import Billing from "./Billing";

export default function SettingTabs() {
  return (
    <div className="dark:text-gray-100 dark:bg-gray-900">
      <Tabs defaultValue="profile">
        <TabsList className="flex items-center space-x-1 text-sm md:space-x-2 bg-white dark:bg-gray-900">
          <TabsTrigger
            value="profile"
            className="flex items-center space-x-2 rounded-lg border px-3 py-2.5 font-medium transition focus:outline-none focus:ring focus:ring-pink-500 focus:ring-opacity-25 active:border-pink-100 dark:active:border-pink-500 dark:active:border-opacity-25 md:px-5"
          >
            <UserRoundCog className="w-6 h-6 text-gray-500" />
            <span className="hidden sm:inline-block">Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="flex items-center space-x-2 rounded-lg border px-3 py-2.5 font-medium transition focus:outline-none focus:ring focus:ring-pink-500 focus:ring-opacity-25 active:border-pink-100 dark:active:border-pink-500 dark:active:border-opacity-25 md:px-5"
          >
            <Wallet className="w-6 h-6 text-gray-500" />
            <span className="hidden sm:inline-block">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="py-6">
          <Profile />
          <ChangePassword />
        </TabsContent>

        <TabsContent value="billing" className="py-6">
          <Billing />
        </TabsContent>
      </Tabs>
    </div>
  );
}
