import { Role } from "@prisma/client";

export const usersFilterBuilder = (query: any) => {
  let filters: { role?: { in: Role[] }; date?: { gte: string | number } } = {};
  if (query.roles) {
    filters.role = { in: query.roles.split("_") };
  }
  //   if (query.date && query.date != undefined) {
  //     filters.date = { gte: query.date };
  //   }

  return filters;
};
