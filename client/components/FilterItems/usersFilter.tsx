"use client";
import { setFilters } from "@/app/redux/features/users/usersSlice";
import { Role, userFilterType } from "@/app/types/userTypes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function UsersFilter() {
  const [stateRole, setstateRole] = useState<string[]>([]);
  const [stateDate, setstateDate] = useState<string | number>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilters({ date: stateDate, role: stateRole }));
  }, [stateDate, stateRole]);

  const handleFilterChange = (e: any, type: string) => {
    switch (type) {
      case "ROLE":
        if (e.target.checked) {
          setstateRole((prev) => {
            return prev?.length && prev.length > 0
              ? [...prev, e.target.value]
              : [e.target.value];
          });
        } else {
          setstateRole((prev: any) => {
            return prev?.filter((f: string) => f !== e.target.value);
          });
        }
        break;
      case "DATE":
        setstateDate(e.target.value);
        break;
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-sm text-gray-500"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Role</AccordionTrigger>
        <AccordionContent className="space-y-2">
          <div className="text-sm flex items-center gap-1">
            <input
              type="checkbox"
              onChange={(e) => {
                handleFilterChange(e, userFilterType.ROLE);
              }}
              value={Role.DOCTOR}
              checked={stateRole?.includes(Role.DOCTOR)}
            />
            <label htmlFor="">Doctor</label>
          </div>
          <div className="text-sm flex items-center gap-1">
            <input
              type="checkbox"
              onChange={(e) => {
                handleFilterChange(e, userFilterType.ROLE);
              }}
              value={Role.ADMIN}
              checked={stateRole?.includes(Role.ADMIN)}
            />
            <label htmlFor="">Admin</label>
          </div>
          <div className="text-sm flex items-center gap-1">
            <input
              type="checkbox"
              onChange={(e) => {
                handleFilterChange(e, userFilterType.ROLE);
              }}
              value={Role.PATIENT}
              checked={stateRole?.includes(Role.PATIENT)}
            />
            <label htmlFor="">Patient</label>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Date</AccordionTrigger>
        <AccordionContent>
          <input
            type="date"
            onChange={(e) => {
              handleFilterChange(e, userFilterType.DATE);
            }}
            value={stateDate}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
