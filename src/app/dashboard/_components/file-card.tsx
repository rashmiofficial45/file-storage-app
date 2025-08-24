import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatRelative } from "date-fns";
import { FileSpreadsheet, FileText, Images, Calendar, User } from "lucide-react";
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
    image: <Images className="h-5 w-5 text-blue-600" />,
    csv: <FileSpreadsheet className="h-5 w-5 text-green-600" />,
    pdf: <FileText className="h-5 w-5 text-red-600" />,
  } as Record<Doc<"files">["types"], ReactNode>;

  const typeColors = {
    image: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
    csv: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
    pdf: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
  };

  const typeLabels = {
    image: "Image",
    csv: "CSV",
    pdf: "PDF",
  };

  return (
    <Card className="group border-0 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden hover:-translate-y-1">
      {/* Header */}
      <CardHeader className="p-0">
        <div className="relative">
          {/* File Type Badge */}
          <div className="absolute top-3 left-3 z-10">
            <div className={`px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2`}>
              {typeIcons[file.types]}
              {typeLabels[file.types]}
            </div>
          </div>

          {/* Action Menu */}
          <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <FileCardAction file={file} />
          </div>

          {/* File Preview */}
          <div
            className="h-48 w-full bg-gradient-to-br cursor-pointer relative overflow-hidden"
            onClick={() => {
              if (!file.url) return;
              window.open(file.url, "window");
            }}
          >
            {file.types === "image" && file.url && (
              <Image
                alt={file.name}
                width={320}
                height={180}
                src={file.url}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            {file.types === "csv" && file.url && (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                <Image
                  alt={file.name}
                  width={120}
                  height={120}
                  src="/CSV.svg"
                  className="object-contain opacity-80"
                />
              </div>
            )}
            {file.types === "pdf" && file.url && (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                <Image
                  alt={file.name}
                  width={120}
                  height={120}
                  src="/pdf-icon.svg"
                  className="object-contain opacity-80"
                />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* File Name */}
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {file.name.length > 30
              ? `${file.name.substring(0, 30)}...`
              : file.name}
          </h3>

          {/* File Type and Size */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span className="capitalize">{file.types} file</span>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {file.types === "image" ? "Image" : file.types === "csv" ? "Spreadsheet" : "Document"}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between w-full">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border-2 border-white dark:border-gray-700 shadow-sm">
              <AvatarImage className="object-cover" src={userProfile?.image} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-medium">
                {userProfile?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                {userProfile?.name || "Unknown User"}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="h-3 w-3" />
                <span>{formatRelative(new Date(file._creationTime), new Date())}</span>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
