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
  } from "@/components/ui/alert-dialog"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Delete, Download, EllipsisVertical } from "lucide-react";
import { Doc } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  file: Doc<"files">;
};

const FileCardAction = ({ file }: Props) => {
    const {toast} = useToast();
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false)
    const deleteFile = useMutation(api.files.deleteFile);
  return (
    <>
<AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your file
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={async()=>{
        await deleteFile({fileId:file._id});
        toast({
            variant:"destructive",
            title:"File Deleted",
            description:"Your file has been deleted."
        })
      }}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className=" cursor-pointer flex gap-2 text-slate-600 items-center">
        <Download />
        Download
        </DropdownMenuLabel>
        <DropdownMenuLabel onClick={()=>{setIsConfirmOpen(true)}} className=" cursor-pointer flex gap-2 text-red-600 items-center">
          <Delete />
          Delete
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
};
const FileCard = ({ file }: Props) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex gap-8 justify-between">
            <div className="text-md">{file.name}</div>
            <div><FileCardAction file={file}/></div>
          </div>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <button>download</button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FileCard;
