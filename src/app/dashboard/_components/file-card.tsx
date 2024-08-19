import React, { ReactNode, useState } from "react";
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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
  FileSpreadsheet,
  FileText,
  Images,
  StarIcon,
  StarOff,
} from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
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
};
const FileCard = ({ file }: Props) => {
  const typeIcons = {
    image: <Images />,
    csv: <FileSpreadsheet />,
    pdf: <FileText />,
  } as Record<Doc<"files">["types"], ReactNode>;
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex gap-8 justify-between">
            <div className="flex justify-center items-center gap-3">
              {typeIcons[file.types]}
              <div className="text-lg font-semibold text-slate-700">
                {file.name}
              </div>
            </div>
            <div>
              <FileCardAction file={file} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex justify-center h-48 w-full">
          {file.types === "image" && file.url && (
            <Image
              alt={file.name}
              width={320}
              height={180}
              src={file.url}
              className="rounded-xl"
            />
          )}
          {file.types === "csv" && file.url && (
            <Image
              alt={file.name}
              width={200}
              height={100}
              src={"/CSV.svg"}
              className=" bg-blend-color-burn"
            />
          )}
          {file.types === "pdf" && file.url && (
            <Image
              alt={file.name}
              width={200}
              height={200}
              src={"/pdf-icon.svg"}
              className=" bg-blend-color-burn"
            />
          )}
        </CardContent>
        <CardFooter>
          <button>download</button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FileCard;
