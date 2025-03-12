import React from "react";
import { Card } from "../../ui/card";
import { ModeToggle } from "../../ui/button-theme-toggle";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProfileButton from "./components/profile-button";

export default function Header() {
  return (
    <Card className=" h-20 p-2 border-0 rounded-none w-full items-center flex border-card-foreground/10">
      <div className="container flex items-center justify-between m-auto">
        <div className="inline-flex items-center gap-2">
          <h1 className="text-card-foreground font-bold">Logo</h1>
        </div>

        <div className="flex items-center justify-between gap-2">
          <ModeToggle />
          <ProfileButton />
        </div>
      </div>
    </Card>
  );
}
