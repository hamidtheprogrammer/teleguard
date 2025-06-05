"use client";
import React, { ReactNode, useEffect } from "react";
import Nav from "@/components/Nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MoveLeft, Settings, MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import Logout from "../(auth)/Logout";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
import { useVerify_auth_tokenQuery } from "../redux/services/auth";
import { setCurrentUser } from "../redux/features/auth/authSlice";
import { Role } from "../types/userTypes";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

const MainLayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <MainLayout>{children}</MainLayout>
    </Provider>
  );
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { data, isSuccess } = useVerify_auth_tokenQuery("");
  const isSideBarCollapsed = useSelector(
    (state: any) => state.global.isSideBarCollapsed
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrentUser(data));

      if (data.role === Role.USER) {
        router.push("/form");
      } else if (data.role === Role.PATIENT) {
      }
    }
  }, [isSuccess]);

  return (
    <div className="relative h-full overflow-hidden">
      <div className="flex flex-row h-full bg-slate-100">
        <section
          className={`h-full ${"w-[20%]"} max-lg:hidden overflow-y-hidden menu`}
        >
          <Nav />
        </section>
        <section className="flex flex-col gap-1 flex-1 ">
          <div className="px-1">
            <Card className="flex justify-between items-center bg-white py-1 rounded-md px-3">
              <div className="flex gap-3">
                <MoveLeft className="max-lg:hidden cursor-pointer" />
                <Sheet>
                  <SheetTrigger className="lg:hidden">
                    <MenuIcon />
                  </SheetTrigger>
                  <SheetContent side={"left"}>
                    <Nav />
                  </SheetContent>
                </Sheet>
              </div>
              <div className="flex items-center gap-2">
                <Settings />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Logout />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          </div>
          <div className="bg-blue-700 inset-0 bg-ball"></div>
          <div
            className="bg-pink-700 
        bottom-0 right-0 bg-ball"
          ></div>
          {children}
        </section>
      </div>
    </div>
  );
};

export default MainLayoutWrapper;
