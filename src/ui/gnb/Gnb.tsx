"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

type GnbItem = {
  name: string;
  href: string;
  key?: GnbKey;
  children?: Array<{
    name: string;
    href: string;
    key: GnbKey;
  }>;
};

const GNB_KEY = {
  ui_breadcrumb: "ui_breadcrumb",
  ui_gnb: "ui_gnb",
  ui_table: "ui_table",
  ui_pagination: "ui_pagination",
  ui_modal: "ui_modal",
  ui_select: "ui_select",
} as const;

type GnbKey = keyof typeof GNB_KEY;

const getGnbItems = (): GnbItem[] => [
  {
    name: "UI Components",
    href: "/ui",
    children: [
      {
        name: "Breadcrumb",
        href: "/ui/breadcrumb",
        key: GNB_KEY.ui_breadcrumb,
      },
      {
        name: "Gnb",
        href: "/ui/gnb",
        key: GNB_KEY.ui_gnb,
      },
      {
        name: "Table",
        href: "/ui/table",
        key: GNB_KEY.ui_table,
      },
      {
        name: "Pagination",
        href: "/ui/pagination",
        key: GNB_KEY.ui_pagination,
      },
      {
        name: "Modal",
        href: "/ui/modal",
        key: GNB_KEY.ui_modal,
      },
      {
        name: "Select",
        href: "/ui/select",
        key: GNB_KEY.ui_select,
      },
    ],
  },
];

// TODO: 실제 구현시에는 API로부터 엑세스 가능한 목록을 가져오기
//! 리액트 쿼리로 서버 상태 관리, stale/gc time 설정 필요
const userPermissionItems = {
  ui_breadcrumb: ["R"],
  ui_gnb: ["R"],
  ui_table: ["R"],
  ui_pagination: ["R"],
  ui_modal: ["R"],
  ui_select: ["R"],
};

const getFilteredMenuByPermissions = (
  items: GnbItem[],
  permissionItems: { [key: string]: string[] },
): GnbItem[] => {
  return items
    .map((item) => {
      if (item.children) {
        const filteredChildren = item.children.filter((child) =>
          permissionItems[child.key]?.includes("R"),
        );

        if (filteredChildren.length > 0) {
          return {
            ...item,
            children: filteredChildren,
          };
        }

        return null;
      }

      return item.key && permissionItems[item.key].includes("R") ? item : null;
    })
    .filter((item): item is GnbItem => item !== null);
};

const GnbItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: GnbItem;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={item.children ? item.children[0].href : item.href}
        onClick={onToggle}
        className={clsx(
          "group flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold",
        )}
      >
        {item.children && (
          <ChevronUpIcon
            className={clsx("h-4 w-4 transition-transform duration-200", {
              "rotate-180": isOpen,
            })}
          />
        )}
        <span className="flex-1">{item.name}</span>
      </Link>
      {item.children && (
        <ul
          className={clsx("space-y-1 pl-2 pt-1", {
            hidden: !isOpen,
          })}
        >
          {item.children.map((child) => (
            <li key={child.name}>
              <Link
                href={child.href}
                className={clsx(
                  "block rounded-md py-2 pl-10 pr-2 text-sm/6 font-semibold",
                  {
                    "bg-gray-50 text-sky-500": pathname === child.href,
                    "text-gray-700 hover:bg-gray-50": pathname !== child.href,
                  },
                )}
              >
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const Gnb = () => {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isOpenGnb, setIsOpenGnb] = useState(true);

  const filteredMenuItems = useMemo(
    () => getFilteredMenuByPermissions(getGnbItems(), userPermissionItems),
    [],
  );

  useEffect(() => {
    const parentItem = filteredMenuItems.find((item) =>
      item.children?.some((child) => pathname === child.href),
    );

    if (parentItem) {
      setOpenItem(parentItem.name);
    }
  }, [pathname, filteredMenuItems]);

  const handleToggle = (name: string) => {
    setOpenItem(openItem === name ? null : name);
  };

  return (
    <aside
      className={clsx(
        "relative flex h-full flex-col border-r border-gray-200 bg-white py-2 transition-all duration-300 ease-in-out",
        {
          "w-[260px]": isOpenGnb,
          "w-16": !isOpenGnb,
        },
      )}
    >
      <div className="absolute right-4 top-4 z-10">
        <button onClick={() => setIsOpenGnb((prev) => !prev)}>
          <ChevronDoubleLeftIcon
            className={clsx("h-6 w-6 cursor-pointer text-gray-500", {
              "rotate-180": !isOpenGnb,
            })}
          />
        </button>
      </div>

      <div
        className={clsx(
          "flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 pt-10 transition-opacity duration-300",
          {
            "opacity-100": isOpenGnb,
            "opacity-0": !isOpenGnb,
          },
        )}
      >
        <nav className="flex flex-1 flex-col">
          <ul className="-mx-2 flex flex-1 flex-col space-y-1">
            {isOpenGnb &&
              filteredMenuItems.map((gnbItem) => (
                <GnbItem
                  key={gnbItem.name}
                  item={gnbItem}
                  isOpen={openItem === gnbItem.name}
                  onToggle={() => handleToggle(gnbItem.name)}
                />
              ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Gnb;
