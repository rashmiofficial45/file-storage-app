import { OrganizationSwitcher, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
type Props = {};

const Header = async (props: Props) => {
  const user = await currentUser()
  return (
    <div className="border-b backdrop-blur-md sticky top-0 z-40 bg-slate-200/50">
      <div className="flex justify-between items-center px-8">
        <div className="font-semibold text-2xl text-slate-900 ">
          File-store
        </div>
        <div className="flex justify-end py-3 items-center gap-4">
          {user ? <>
            <OrganizationSwitcher
              appearance={{
                variables: {
                  fontSize: "1rem",
                },
              }}
            />
            <UserButton />
          </> : <>
            <SignedOut>
              <SignInButton>
                <Button variant={"default"} className=" text-base rounded-lg">Sign up</Button>
              </SignInButton>
            </SignedOut>
          </>}
        </div>
      </div>
    </div>
  );
};

export default Header;
