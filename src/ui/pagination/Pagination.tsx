import {
  ChevronDoubleRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

type Pagination = {
  page: number;
  itemsPerPage: number;
};

interface Props {
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  totalPage: number;
  totalCount: number;
}

const PaginationComponent = ({
  pagination,
  setPagination,
  totalPage,
  totalCount,
}: Props) => {
  const currMinIdx = (pagination.page - 1) * pagination.itemsPerPage + 1;
  const currMaxIdx =
    (pagination.page - 1) * pagination.itemsPerPage + pagination.itemsPerPage;
  return (
    <div className="flex items-center gap-2">
      <button
        className="rotate-180 disabled:text-gray-400"
        disabled={pagination.page <= 1}
        onClick={() => {
          setPagination((prev) => ({ ...prev, page: 1 }));
        }}
      >
        <ChevronDoubleRightIcon className="h-4 w-4" />
      </button>
      <button
        className="-rotate-90 disabled:text-gray-400"
        disabled={pagination.page <= 1}
        onClick={() => {
          setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
        }}
      >
        <ChevronUpIcon className="h-4 w-4" />
      </button>

      <span className="select-none">
        {`${currMinIdx} - ${
          currMaxIdx < totalCount ? currMaxIdx : totalCount
        } of ${totalCount}`}
      </span>

      <button
        className="rotate-90 disabled:text-gray-400"
        disabled={totalPage <= pagination.page}
        onClick={() => {
          setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
        }}
      >
        <ChevronUpIcon className="h-4 w-4" />
      </button>
      <button
        className="disabled:text-gray-400"
        disabled={totalPage <= pagination.page}
        onClick={() => {
          setPagination((prev) => ({ ...prev, page: totalPage }));
        }}
      >
        <ChevronDoubleRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PaginationComponent;
