"use client";

import { usePagination } from "@/hooks/usePagination";
import { useState } from "react";

const UsePaginationPage = () => {
  const {
    back,
    currentPage,
    go,
    hasNextPage,
    hasPreviousPage,
    next,
    pageSize,
    totalPage,
  } = usePagination({
    pageSize: 10,
    page: 1,
    totalItems: 1000,
  });

  const [pageGo, setPageGo] = useState(1);

  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-4">Use Pagination</h1>
      <div className="flex gap-2 justify-center">
        {[-2, -1, 0, 1, 2].map((val) => {
          if (currentPage + val > 0) {
            if (currentPage + val <= totalPage)
              return (
                <button
                  key={val}
                  onClick={() => {
                    if (currentPage + val !== currentPage)
                      go(currentPage + val);
                  }}
                  className="px-2 outline outline-1 flex-1 max-w-[3rem] py-1 rounded hover:bg-slate-200 data-[state=currentPage]:bg-slate-300"
                  data-state={
                    currentPage + val === currentPage ? "currentPage" : ""
                  }
                >
                  {currentPage + val}
                </button>
              );
          }
        })}
      </div>
      <p className="text-center">{pageSize} per page</p>
      <div className="flex justify-center my-5 gap-2">
        <button
          onClick={() => back()}
          disabled={!hasPreviousPage}
          className="px-2 outline disabled:opacity-20 outline-1 flex-1 max-w-[3rem] py-1 rounded hover:bg-slate-200"
        >
          Back
        </button>
        <button
          onClick={() => next()}
          disabled={!hasNextPage}
          className="px-2 outline disabled:opacity-20 outline-1 flex-1 max-w-[3rem] py-1 rounded hover:bg-slate-200"
        >
          Next
        </button>
      </div>
      <div className="flex justify-center my-5 gap-2">
        <button
          onClick={() => back(true)}
          disabled={!hasPreviousPage}
          className="px-2 outline disabled:opacity-20 outline-1 flex-1 max-w-[8rem] py-1 rounded hover:bg-slate-200"
        >
          1st page
        </button>
        <button
          onClick={() => next(true)}
          disabled={!hasNextPage}
          className="px-2 outline disabled:opacity-20 outline-1 flex-1 max-w-[8rem] py-1 rounded hover:bg-slate-200"
        >
          Last page
        </button>
      </div>
      <div className="flex flex-1 items-center gap-2 flex-col">
        <input
          type="number"
          defaultValue={pageGo}
          value={pageGo}
          onChange={(e) => {
            setPageGo(Number(e.target.value));
          }}
          className="border-2 border-slate-600 px-2 py-1"
        />
        <button
          onClick={() => go(pageGo)}
          className="px-2 outline outline-1 flex-1 max-w-[3rem] py-1 rounded hover:bg-slate-200"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default UsePaginationPage;
