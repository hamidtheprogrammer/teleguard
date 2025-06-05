"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllUsersQuery } from "@/app/redux/services/users";
import { Input } from "@/components/ui/input";
import { Check, Search } from "lucide-react";
import { FilterBox } from "@/components/filter";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const page = () => {
  const { data, isError, isLoading } = useGetAllUsersQuery("");

  useEffect(() => {
    data && !isError && console.log(data);
  }, [data, isError]);

  return (
    <div className="px-1 h-[90%]">
      <div className="h-full flex flex-col w-full rounded-bl-none px-0">
        <CardHeader>
          <CardTitle>Health Consultants</CardTitle>
          <CardDescription className="flex justify-between w-full items-end">
            <p>Select from over 50 specialists to meet</p>
            <FilterBox />
            <div className="relative">
              <Input
                placeholder="search users"
                className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
                type="search"
              ></Input>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-500" size={20} />
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-1">
          <header className="flex flex-row border-b-[1px] text-blue-500">
            <span className="flex-1">User</span>
            <span className="flex-1">Contact</span>
            <span className="flex-1">Status</span>
            <span className="flex-1">Role</span>
          </header>
          <ul className="flex flex-col">
            {data &&
              data.users &&
              data.users.length &&
              data.users.map((user, idx) => (
                <li key={user.id as string}>
                  <Link
                    href={`/appointments/doctors/${user.id}/${user.username}/book`}
                    className={`${
                      idx % 2 !== 0 && "bg-slate-50"
                    } flex flex-row border-b-[1px] py-1 items-center text-[0.8rem] hover:bg-slate-100`}
                  >
                    <span className="flex-1 flex gap-1 items-center">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn" />
                        <AvatarFallback>
                          {user.username.substring(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <p>{user.username}</p>
                    </span>
                    <span className="flex-1 text-blue-800 hover:underline">
                      <a
                        href={`http://${user.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.email}
                      </a>
                    </span>
                    <span className="flex-1">
                      {user.verified ? (
                        <p className="flex gap-1 items-center bg-green-200 font-bold text-green-800 text-[0.7rem] w-fit rounded-full px-2">
                          <p>verified</p> <Check size={13} fontWeight={20} />
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </span>
                    <span className="flex-1">{user.role}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </CardContent>
      </div>
    </div>
  );
};

export default page;
