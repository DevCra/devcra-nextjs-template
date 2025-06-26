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
  general_coupon: "general_coupon",
  login: "login",
} as const;

type GnbKey = keyof typeof GNB_KEY;

const getGnbItems = (): GnbItem[] => [
  {
    name: "General",
    href: "",
    children: [
      {
        name: "Coupon",
        href: "/coupon",
        key: GNB_KEY.general_coupon,
      },
    ],
  },
  {
    name: "Login",
    href: "/signin",
    key: GNB_KEY.login,
  },
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
  general_coupon: ["R"],
  login: ["R"],
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
      {item.children ? (
        <button
          onClick={onToggle} // 메뉴 열고 닫기만 수행
          className={clsx(
            "group flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold",
            {
              "text-gray-700 hover:bg-gray-50": true, // 버튼 스타일
            },
          )}
        >
          <ChevronUpIcon
            className={clsx("h-4 w-4 transition-transform duration-200", {
              "rotate-180": isOpen,
            })}
          />
          <span className="flex-1">{item.name}</span>
        </button>
      ) : (
        <Link
          href={item.href} // children이 없을 때만 href 사용
          className={clsx(
            "group flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold",
            {
              "text-gray-700 hover:bg-gray-50": true, // 링크 스타일
            },
          )}
        >
          <span className="flex-1">{item.name}</span>
        </Link>
      )}
      {item.children && (
        <ul
          className={clsx("space-y-1 pt-1 pl-2", {
            hidden: !isOpen,
          })}
        >
          {item.children.map((child) => (
            <li key={child.name}>
              <Link
                href={child.href}
                className={clsx(
                  "block rounded-md py-2 pr-2 pl-10 text-sm/6 font-semibold",
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

const GnbSimple = () => {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isOpenGnb, setIsOpenGnb] = useState(true);

  const filteredMenuItems = useMemo(
    () => getFilteredMenuByPermissions(getGnbItems(), userPermissionItems),
    [],
  );

  useEffect(() => {
    // 첫 번째 메뉴를 기본적으로 열기
    if (filteredMenuItems.length > 0) {
      setOpenItem(filteredMenuItems[0].name);
    }

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
      <div className="absolute top-4 right-4 z-10">
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
          "flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pt-10 pb-4 transition-opacity duration-300",
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

export default GnbSimple;
