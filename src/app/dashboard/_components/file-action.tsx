import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Delete,
  Download,
  EllipsisVertical,
  RotateCcw,
  StarIcon,
  StarOff,
  Trash2,
} from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { Protect } from "@clerk/nextjs";
type Props = {
  file: Doc<"files"> & { url: string | null; isFavourited: boolean };
};
const FileCardAction = ({ file }: Props) => {
  const { toast } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const deleteFile = useMutation(api.files.deleteFile);
  const restoreFile = useMutation(api.files.restoreFile);
  const toggleFavourite = useMutation(api.files.toggleFavourites);
  const me = useQuery(api.users.getMe)
  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete your file. You can visit this file in
              Trash.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                toast({
                  variant: "default",
                  title: "File Deleted",
                  description: "Your file has been moved to trash.",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel
            onClick={() => {
              if (!file.url) return;
              window.open(file.url, "_blank");
            }}
            className=" cursor-pointer flex gap-2 text-slate-600 items-center"
          >
            <Download />
            Download
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel
            onClick={() => {
              toggleFavourite({ fileId: file._id });
              setIsDropdownOpen(false);
            }}
            className=" cursor-pointer flex gap-2 text-slate-600 items-center"
          >
                {file.isFavourited ? (
                  <>
                    <StarOff /> Unfavorite
                  </>
                ) : (
                  <>
                    <StarIcon /> Favorite
                  </>
                )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Protect condition={
            (check)=>{
              return check({
                role:"org:admin"
              })||file.userId === me?._id
              ;
            }
          } fallback={
            <></>
          }>
            <DropdownMenuLabel
              onClick={() => {
                if (file.shouldDelete) {
                  restoreFile({ fileId: file._id })
                }
                else{
                  setIsConfirmOpen(true);
                }
              }}
              className=" cursor-pointer flex-col  items-center"
            >
              {file.shouldDelete ? (
                <div className="flex gap-2 text-lime-500 items-center">
                  <RotateCcw />
                  Restore
                </div>
              ) : (
                <div className="flex gap-2 items-center text-red-600">
                  <Trash2 />
                  Delete
                </div>
              )}
            </DropdownMenuLabel>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FileCardAction;
