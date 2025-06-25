"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return { path, label };
  });

  if (pathSegments.length <= 1) {
    return null;
  }

  return (
    <nav>
      <ol className="flex items-center">
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index !== 0 && (
              <ChevronUpIcon className="h-4 w-4 mx-2 rotate-90 text-gray-400" />
            )}
            <Link
              href={item.path}
              className={clsx("text-sm font-medium", {
                "pointer-events-none cursor-default text-gray-900":
                  index === breadcrumbItems.length - 1,
                "text-gray-500 hover:text-gray-700":
                  index !== breadcrumbItems.length - 1,
              })}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
