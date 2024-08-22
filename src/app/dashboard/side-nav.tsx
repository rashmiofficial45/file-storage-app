import { Button } from "@/components/ui/button";
import {
  FileIcon,
  SquareChevronRight,
  StarIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {};

const SideNav = (props: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Sheet key={"left"}>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <SquareChevronRight />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>
                <SheetClose asChild>
                  <Link href={"/dashboard/files"}>
                    <Button
                      variant="link"
                      className="flex items-center justify-center gap-4 text-2xl p-4"
                    >
                      <FileIcon />
                      All Files
                    </Button>
                  </Link>
                </SheetClose>
              </SheetTitle>
              <SheetTitle>
                <SheetClose asChild>
                  <Link href={"/dashboard/favourites"}>
                    <Button
                      variant={"link"}
                      className="flex items-center justify-center gap-4 text-2xl p-4"
                    >
                      <StarIcon />
                      Favourites
                    </Button>
                  </Link>
                </SheetClose>
              </SheetTitle>
              <SheetTitle>
                <SheetClose asChild>
                  <Link href={"/dashboard/trash"}>
                    <Button
                      variant={"link"}
                      className="flex items-center justify-center gap-4 text-2xl p-4"
                    >
                      <Trash2Icon />
                      Trash
                    </Button>
                  </Link>
                </SheetClose>
              </SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default SideNav;
