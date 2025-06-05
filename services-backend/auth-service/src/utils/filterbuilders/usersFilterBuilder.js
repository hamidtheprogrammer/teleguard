"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersFilterBuilder = void 0;
const usersFilterBuilder = (query) => {
    let filters = {};
    if (query.roles) {
        filters.role = { in: query.roles.split("_") };
    }
    //   if (query.date && query.date != undefined) {
    //     filters.date = { gte: query.date };
    //   }
    return filters;
};
exports.usersFilterBuilder = usersFilterBuilder;
