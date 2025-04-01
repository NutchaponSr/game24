"use client";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { LoaderIcon, LogOutIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/providers/auth-provider";

import { logout } from "@/modules/auth/actions/logout";

export const UserButton = () => {
  const router = useRouter();
  const { user, loading, refreshSession } = useAuth();
  
  if (loading) {
    return (
      <LoaderIcon className="animate-spin size-6" />
    );
  }

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      await refreshSession();
      router.refresh();
    } else {
      toast.error(result.error || "Something went wrong");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="bg-blue-400 text-white font-medium">
            {user?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-60 min-w-60">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar className="size-7 rounded-sm">
            <AvatarFallback className="bg-blue-400 text-white font-medium rounded-sm">
              {user?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-medium whitespace-nowrap text-ellipsis overflow-hidden">{user?.name}</h2>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}