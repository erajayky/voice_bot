import { LockKeyhole } from "lucide-react";
import Header from "./header";
import { useChangePasswordMutation } from "@/queries/auth/useChangePasswordMutation";
// import toast from "react-hot-toast";
import { useToast } from "@/components/ui/use-toast";
import { parseError } from "@/utils/errors";
import { useState } from "react";
import { useUserContext } from "@/contexts/userContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default function ChangePassword() {
  const [password, setPassword] = useState<string>("");
  const {toast} = useToast()
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPassword1, setNewPassword1] = useState<string>("");

  const { user } = useUserContext();
  const {
    mutate: changePassword,
    isLoading: isLoading,
    error,
  } = useChangePasswordMutation({
    onError: (error: any) => {
      // toast.error(parseError(error));
      
      toast({
        variant: "destructive",
        title: "Error",
        description: parseError(error),
      });
    },
  });

  const handleSubmit = () => {
    let toastId;
    try {
      if (newPassword1 !== newPassword) {
        // toast.error("Passwords do not match");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
        return;
      }
      // toastId = toast.loading("Updating...");
      const toastId = toast({
        title: "Updating data..."
      })
      changePassword({
        oldPassword: password,
        newPassword: newPassword,
      });
      // toast.success("Password updated");
        toast({
          title: "Success",
          description: "Password updated",
        });
    } catch (err) {
      // TODO: add sentry
      console.log("error ---<>", err);
    } finally {
      toast({
        title: "Success",
        description: "Password updated",
      });
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
      <CardHeader className="p-0">
        <Header title="Change Password">
          {" "}
          <LockKeyhole className="text-pink-400" />{" "}
        </Header>
      </CardHeader>
      <CardContent className="grow p-5 md:flex md:space-x-5">
        <CardDescription className="mb-5 text-sm text-gray-500 dark:text-gray-400 md:w-1/3 md:flex-none">
          Changing your sign in password is an easy way to keep your account
          secure.
        </CardDescription>
        <div className="space-y-6 md:w-1/2">
          {user?.providers?.includes("Password") && (
            <>
              <div className="space-y-1">
                <Label htmlFor="password" className="font-medium">
                  Current Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
                />
              </div>
            </>
          )}
          <div className="space-y-1">
            <Label htmlFor="password_new" className="font-medium">
              New Password
            </Label>
            <Input
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type="password"
              id="password_new"
              name="password_new"
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password_new_confirm" className="font-medium">
              Confirm Password
            </Label>
            <Input
              value={newPassword1}
              onChange={(e) => {
                setNewPassword1(e.target.value);
              }}
              type="password"
              id="password_new_confirm"
              name="password_new_confirm"
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
            />
          </div>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
            className="inline-flex items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-3 py-2 text-sm font-semibold leading-5 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-white focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
          >
            Update Password
          </Button>
        </div>
      </CardContent>
      {/* END Body */}
    </Card>
  );
}
