import { OrganizationSwitcher, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const Header = async (props: Props) => {
  const user = await currentUser()
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-lg dark:bg-gray-900/80 dark:border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                FileStore
              </h1>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                Professional File Management
              </div>
            </div>
          </div>



          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden sm:block">
                  <OrganizationSwitcher
                    appearance={{
                      variables: {
                        fontSize: "0.875rem",
                      },
                      elements: {
                        organizationSwitcherTrigger: "h-9 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700/80 rounded-lg transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm",
                      },
                    }}
                  />
                </div>
                <div className="h-6 w-px bg-gray-300/50 dark:bg-gray-600/50 hidden sm:block"></div>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-9 w-9 ring-2 ring-gray-200/50 dark:ring-gray-700/50",
                    },
                  }}
                />
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <SignedOut>
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white backdrop-blur-sm">
                    Sign in
                  </Button>
                  <SignInButton>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-medium backdrop-blur-sm">
                      Get Started
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
