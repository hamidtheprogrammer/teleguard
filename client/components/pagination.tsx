import React from "react";

const Pagination = ({
  pages,
  pageNumber,
  changePage,
}: {
  pages: number;
  pageNumber: number;
  changePage: (number: string) => void;
}) => {
  return (
    <>
      <span className="text-xs text-black/75">previous</span>
      <ul className="flex gap-1 mx-3">
        {Array.from({ length: pages }).map((_, index) => (
          <li
            className={`flex justify-center rounded-sm items-center ${
              index + 1 === pageNumber && "bg-blue-500 text-white"
            } text-sm w-8 h-8`}
            key={index + 1}
            onClick={() => {
              changePage((index + 1).toString());
            }}
          >
            {index + 1}
          </li>
        ))}
      </ul>
      <span className="text-xs text-black/75">next</span>
    </>
  );
};

export default Pagination;
