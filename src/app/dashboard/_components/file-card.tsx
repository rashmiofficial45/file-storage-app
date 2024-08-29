import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatRelative } from "date-fns";
import { FileSpreadsheet, FileText, Images } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Doc } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import FileCardAction from "./file-action";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type Props = {
  file: Doc<"files"> & { url: string | null; isFavourited: boolean };
};

const FileCard = ({ file }: Props) => {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });
  const typeIcons = {
    image: <Images />,
    csv: <FileSpreadsheet />,
    pdf: <FileText />,
  } as Record<Doc<"files">["types"], ReactNode>;
  return (
    <div>
      <Card className="border rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg bg-white">
        <CardHeader className="p-4 bg-gradient-to-r from-gray-100 to-gray-50 border-b">
          <div className="flex flex-col sm:flex-row sm:gap-8 justify-between relative">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {typeIcons[file.types]}
              <div className="text-lg font-semibold text-slate-700 truncate w-full sm:w-auto">
                {file.name.length > 30
                  ? `${file.name.substring(0, 15)}...`
                  : file.name}
              </div>
            </div>
            <div className="absolute sm:relative right-0 sm:right-auto">
              <FileCardAction file={file} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex justify-center items-center h-48 w-full bg-gray-100 pt-6 cursor-pointer" onClick={() => {
              if (!file.url) return;
              window.open(file.url, "window");
            }}>
          {file.types === "image" && file.url && (
            <Image
              alt={file.name}
              width={320}
              height={180}
              src={file.url}
              className="rounded-xl object-cover"
            />
          )}
          {file.types === "csv" && file.url && (
            <Image
              alt={file.name}
              width={200}
              height={100}
              src={"/CSV.svg"}
              className="object-contain"
            />
          )}
          {file.types === "pdf" && file.url && (
            <Image
              alt={file.name}
              width={200}
              height={200}
              src={"/pdf-icon.svg"}
              className="object-contain"
            />
          )}
        </CardContent>

        <CardFooter className="flex flex-col md:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-700 w-full sm:w-auto">
            <Avatar className="w-8 h-8 border border-gray-300 rounded-full overflow-hidden">
              <AvatarImage className="object-cover" src={userProfile?.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="truncate">{userProfile?.name}</span>
          </div>
          <div className="text-xs text-gray-700 w-full sm:w-auto text-left sm:text-right">
            Uploaded on{" "}
            {formatRelative(new Date(file._creationTime), new Date())}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FileCard;
