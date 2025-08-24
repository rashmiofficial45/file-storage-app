"use client";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadButton } from "../_components/upload-button";
import FileCard from "../_components/file-card";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { GridIcon, RowsIcon, FolderOpen, Star, Trash2 } from "lucide-react";
import { SearchBar } from "../_components/search-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Doc } from "../../../../convex/_generated/dataModel";

type Props = {
  title: string;
  favourites?: boolean;
  deletedOnly?: boolean;
};

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-12 w-[250px]" />
      </div>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 rounded-lg pt-12 w-full">
      <Skeleton className="h-[325px] w-[350px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-6 w-[200px]" />
      </div>
    </div>
  );
}

const FileBrowser = ({ title, favourites, deletedOnly }: Props) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<Doc<"files">["types"] | "All">("All");
  const [activeTab, setActiveTab] = useState("grid");
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user?.user?.id;
  }

  const allFavourites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
        orgId,
        type: type === "All" ? undefined : type,
        query,
        favourites,
        deletedOnly,
      }
      : "skip"
  );

  const isLoading = files === undefined;

  if (files === null)
    return (
      <div className="flex flex-col pl-6 pt-12">
        <SkeletonDemo />
        <div className="flex mx-auto justify-center mt-32 flex-col">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-2 auto-rows-max">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );

  if (!allFavourites) {
    return (
      <div className="flex flex-col pl-6 pt-12">
        <SkeletonDemo />
        <div className="flex mx-auto justify-center mt-20 flex-col">
          <div className="grid gap-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pr-12 pt-2 auto-rows-max">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavourited: (allFavourites ?? []).some(
        (favourite) => favourite.fileId === file._id
      ),
    })) ?? [];

  // Get icon based on page type
  const getPageIcon = () => {
    if (favourites) return <Star className="h-8 w-8 text-yellow-500" />;
    if (deletedOnly) return <Trash2 className="h-8 w-8 text-red-500" />;
    return <FolderOpen className="h-8 w-8 text-blue-500" />;
  };

  // Get subtitle based on page type
  const getPageSubtitle = () => {
    if (favourites) return "Your starred and favorite files";
    if (deletedOnly) return "Files in the trash - recover or permanently delete";
    return "All your uploaded files in one place";
  };

  return (
    <>
      {isLoading && (
        <div className="flex mx-auto justify-center mt-32 flex-col p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pr-12 pt-2 auto-rows-max">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      )}

      {!isLoading && (
        <>
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex items-center space-x-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50">
                    {getPageIcon()}
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {getPageSubtitle()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full lg:w-auto">
                  <div className="w-full sm:w-auto flex-1">
                    <SearchBar query={query} setQuery={setQuery} />
                  </div>
                  <div className="w-full sm:w-auto">
                    <UploadButton />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <TabsList className="bg-gray-100 dark:bg-gray-800 p-1">
                  <TabsTrigger
                    value="grid"
                    className="flex gap-2 items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
                  >
                    <GridIcon className="h-4 w-4" />
                    Grid View
                  </TabsTrigger>
                  <TabsTrigger
                    value="table"
                    className="flex gap-2 items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
                  >
                    <RowsIcon className="h-4 w-4" />
                    Table View
                  </TabsTrigger>
                </TabsList>

                <div className="hidden sm:flex gap-3 items-center">
                  <Label htmlFor="type-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filter by type:
                  </Label>
                  <Select
                    value={type}
                    onValueChange={(newType) => {
                      setType(newType as any);
                    }}
                  >
                    <SelectTrigger
                      id="type-select"
                      defaultValue={"All"}
                      className="w-[180px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                      <SelectValue placeholder="All file types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All file types</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="csv">CSV files</SelectItem>
                      <SelectItem value="pdf">PDF documents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Empty State */}
              {!isLoading && !query && files.length === 0 && (
                <div className="flex items-center justify-center flex-col py-16 px-8">
                  <div className="relative">
                    <Image
                      src="/empty.svg"
                      height="300"
                      width="300"
                      alt="No files found"
                      className="opacity-80"
                    />
                  </div>
                  <div className="mt-8 text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      This folder is empty
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                      {favourites === false && deletedOnly === false
                        ? "Start by uploading your first file to get organized"
                        : "No files found in this section"
                      }
                    </p>
                    {favourites === false && deletedOnly === false && (
                      <div className="mt-6">
                        <UploadButton />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Grid View */}
              <TabsContent value="grid" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">
                  {modifiedFiles?.map((file) => {
                    return <FileCard key={file._id} file={file} />;
                  })}
                </div>
              </TabsContent>

              {/* Table View */}
              {!isLoading && !query && files.length === 0 ? (
                <div>
                  <TabsContent value="table" hidden>
                    <DataTable columns={columns} data={modifiedFiles} />
                  </TabsContent>
                </div>
              ) : (
                <div className="mt-6">
                  <TabsContent value="table">
                    <DataTable columns={columns} data={modifiedFiles} />
                  </TabsContent>
                </div>
              )}
            </Tabs>
          </div>
        </>
      )}
    </>
  );
};

export default FileBrowser;
