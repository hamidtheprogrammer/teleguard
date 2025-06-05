"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { UsersFilter } from "./FilterItems/usersFilter";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function FilterBox() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="space-x-1">
        <Button variant="outline">
          <Filter size={18} /> <p>Filter</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter users</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <UsersFilter />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
