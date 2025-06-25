import type { Metadata } from "next";

import "./globals.css";

import { pretendardStd } from "@/components/fonts";
import clsx from "clsx";
import NextTopLoader from "nextjs-toploader";
import ModalRoot from "../ui/modal/ModalRoot";
export const metadata: Metadata = {
  title: "devcra-nextjs-template",
  description: "DevCra.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={clsx(
          "font-pretendard-std antialiased",
          pretendardStd.variable,
        )}
      >
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.8}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD, 0 0 5px #2299DD"
        />
        {children}
        <ModalRoot />
      </body>
    </html>
  );
}
