import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "~/@/components/ui/avatar";

import { Button } from "~/@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/@/components/ui/dropdown-menu";
import React from "react";
import { useUserAction } from "~/hooks/useUser";
import { useTypedSelector } from "~/hooks/useTypedSelector";

function SignOut({ children }: { children?: React.ReactNode }) {
  const { logoutUser } = useUserAction();
  const { firstname, lastname, email } = useTypedSelector(
    (state) => state.user.currentUser,
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {firstname} {lastname}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/login" onClick={() => logoutUser()}>
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 pb-2 pt-6 sm:px-8 sm:py-8">
      <Link className='font-["Archivo"] text-4xl font-black' to="/">
        TilaTikki
      </Link>
      <nav className="flex items-center gap-2">
        <SignOut />
      </nav>
    </header>
  );
}
