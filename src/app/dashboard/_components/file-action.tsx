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
  StarIcon,
  StarOff,
} from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
type Props = {
  file: Doc<"files"> & { url: string | null , isFavourited: boolean };
};
const FileCardAction = ({ file }: Props) => {
  const { toast } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const deleteFile = useMutation(api.files.deleteFile);
  const toggleFavourite = useMutation(api.files.toggleFavourites);
  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              file and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                toast({
                  variant: "destructive",
                  title: "File Deleted",
                  description: "Your file has been deleted.",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}
      >
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
              setIsDropdownOpen(false)
            }}
            className=" cursor-pointer flex gap-2 text-slate-600 items-center"
          >
            {file.isFavourited ? (
              <>
                <StarOff /> Unfavorite
              </>
            ) : (
              <>
                 <StarIcon/> Favorite
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel
            onClick={() => {
              setIsConfirmOpen(true);
            }}
            className=" cursor-pointer flex gap-2 text-red-600 items-center"
          >
            <Delete />
            Delete
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default FileCardAction;
