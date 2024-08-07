import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="border-b">
      <div className="flex justify-between items-center px-8">
        <div className="font-semibold text-2xl text-slate-900 ">
            File-store
        </div>
        <div className="flex justify-end py-3 items-center gap-4">
          <OrganizationSwitcher
            appearance={{
              variables: {
                fontSize: "1rem",
              },
            }}
          />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
