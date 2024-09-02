import { OrganizationSwitcher, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
type Props = {};

const Header = async (props: Props) => {
  const user = await currentUser()
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
          {user ? <>
          </>:<>
          <SignedOut>
        <SignInButton>
          Sign In
        </SignInButton>
      </SignedOut>
          </>}
        </div>
      </div>
    </div>
  );
};

export default Header;
