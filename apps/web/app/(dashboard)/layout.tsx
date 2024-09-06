"use client";

import { Input } from "@sdsc/ui/input";

import { Main } from "@sdsc/ui/main";
import { AccountMenu } from "@/app/components/auth/AccountMenu";
import AppHeader from "@/app/components/shared/molecules/app-header";

type Props = {
  children: React.ReactNode;
};
export default function Overview({ children }: Props) {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b fixed w-full top-0 left-0 bg-white z-30 shadow-md">
        <div className="flex h-16 items-center px-4">
          <AppHeader />
          <div className="ml-auto flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[100px] lg:w-[300px]"
            />
            <AccountMenu />
          </div>
        </div>
      </div>
      <Main className="w-full max-w-full h-full mt-16 max-h-[calc(100vh-4rem)] flex flex-col">
        {children}
      </Main>
    </div>
  );
}
