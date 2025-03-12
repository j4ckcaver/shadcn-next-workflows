import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@iconify/react";
import React from "react";

export default function ProfileButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="size-8 rounded-full bg-primary cursor-pointer"></div>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="grid gap-1">
          {/* Minimal profil bilgisi */}
          <div className="p-2 rounded-md cursor-pointer hover:bg-muted flex items-center space-x-2">
            <Icon icon="lucide:user" className="h-4 w-4" />
            <span className="text-sm">Profile</span>
          </div>

          <div className="p-2 rounded-md cursor-pointer hover:bg-muted flex items-center space-x-2">
            <Icon icon="lucide:shield" className="h-4 w-4" />
            <span className="text-sm">Security</span>
          </div>

          <div className="p-2 rounded-md cursor-pointer hover:bg-muted flex items-center space-x-2">
            <Icon icon="lucide:bell" className="h-4 w-4" />
            <span className="text-sm">Notifications</span>
          </div>

          <div className="p-2 rounded-md cursor-pointer hover:bg-muted flex items-center space-x-2">
            <Icon icon="lucide:settings" className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </div>

          {/* Ayırıcı çizgi */}
          <div className="border-t my-1"></div>

          {/* Çıkış */}
          <div className="p-2 rounded-md  hover:bg-red-50 cursor-pointer hover:text-red-600 text-red-500 flex items-center space-x-2">
            <Icon icon="lucide:log-out" className="h-4 w-4" />
            <span className="text-sm">Logout</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
