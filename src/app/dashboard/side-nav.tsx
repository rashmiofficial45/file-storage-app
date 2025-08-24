"use client"

import { Button } from "@/components/ui/button";
import {
  FileIcon,
  Menu,
  StarIcon,
  Trash2Icon,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`lg:flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0`}>

        {/* Header - only visible on lg+ */}
        <div
          className={`hidden lg:block p-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${isOpen ? "px-6" : "px-2"
            }`}
        >
          <div className="flex items-center justify-between">
            {isOpen ? (
              <>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  File Storage
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 mx-auto"
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>


        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link href={"/dashboard/files"}>
            <div className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 transition-all duration-200 cursor-pointer ${!isOpen && 'justify-center'
              }`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors flex-shrink-0">
                <FileIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              {isOpen && (
                <div className="flex flex-col min-w-0">
                  <span className="font-medium">All Files</span>
                </div>
              )}
            </div>
          </Link>

          <Link href={"/dashboard/favourites"}>
            <div className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 cursor-pointer ${!isOpen && 'justify-center'
              }`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/20 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/30 transition-colors flex-shrink-0">
                <StarIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              {isOpen && (
                <div className="flex flex-col min-w-0">
                  <span className="font-medium">Favourites</span>
                </div>
              )}
            </div>
          </Link>

          <Link href={"/dashboard/trash"}>
            <div className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 cursor-pointer ${!isOpen && 'justify-center'
              }`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors flex-shrink-0">
                <Trash2Icon className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              {isOpen && (
                <div className="flex flex-col min-w-0">
                  <span className="font-medium">Trash</span>
                </div>
              )}
            </div>
          </Link>
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                File Storage App
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Secure • Fast • Reliable
              </p>
            </div>
          </div>
        )}
      </div>















      {/* Mobile Sheet Navigation - Single trigger for all small screens */}
      {/* <Sheet>
        <SheetTrigger asChild>
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent side={"left"} className="w-80 border-r border-gray-200 dark:border-gray-800">
          <SheetHeader className="pb-6">
            <SheetTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Navigation
            </SheetTitle>
          </SheetHeader>

          <nav className="space-y-2">
            <SheetClose asChild>
              <Link href={"/dashboard/files"}>
                <div className="group flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                    <FileIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">All Files</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Manage your files</span>
                  </div>
                </div>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={"/dashboard/favourites"}>
                <div className="group flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/20 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/30 transition-colors">
                    <StarIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="flex flex-col">
                      <span className="font-medium">Favourites</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Starred files</span>
                    </span>
                  </div>
                </div>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={"/dashboard/trash"}>
                <div className="group flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                    <Trash2Icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Trash</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Deleted files</span>
                  </div>
                </div>
              </Link>
            </SheetClose>
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                File Storage App
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Secure • Fast • Reliable
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet> */}
    </>
  );
};

export default SideNav;

