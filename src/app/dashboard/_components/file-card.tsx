import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  FileSpreadsheet,
  FileText,
  Images,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Doc } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import FileCardAction from "./file-action";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type Props = {
  file: Doc<"files"> & { url: string | null , isFavourited: boolean };
}

const FileCard = ({ file }: Props) => {
  const userProfile = useQuery(api.users.getUserProfile , {userId:file.userId})
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
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-xs text-gray-700">
          {/* Uploaded on {formatRelative(new Date(file._creationTime), new Date())} */}
        </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FileCard;
