import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { adminNav, doctorNav, patientNav } from "@/app/constants";
import * as LucideIcons from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Role } from "@/app/types/userTypes";

const Nav = () => {
  const currentUser = useSelector((state: any) => state.auth);

  const nav =
    currentUser.role === Role.ADMIN
      ? adminNav
      : currentUser.role === Role.PATIENT
      ? patientNav
      : doctorNav;

  const pathname = usePathname();

  return (
    <Card className="rounded-none menu  min-h-full bg-slate-100 overflow-y-auto menu h-[80%]">
      <CardHeader>
        <CardTitle>
          <img src="./assets/png.png" className="h-12" alt="logo" />
        </CardTitle>
        <CardDescription>Menu</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <ul className="flex flex-col gap-2">
          {nav.map((item: any, index: number) => {
            const IconComponent = LucideIcons[item.icon]; // Map string to Lucide icon component
            return (
              <li key={index}>
                <Link
                  className={`flex items-center text-xs space-x-1 rounded-md px-2 py-3 ${
                    pathname.includes(item.link) && "bg-blue-500 text-white"
                  }`}
                  href={item.link}
                >
                  <IconComponent className="text-gray-500" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Nav;
