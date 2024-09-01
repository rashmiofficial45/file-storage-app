"use client";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadButton } from "../_components/upload-button";
import FileCard from "../_components/file-card";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { GridIcon, RowsIcon } from "lucide-react";
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
       <SkeletonDemo/>
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
       <SkeletonDemo/>
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
          <div className="flex flex-col md:flex-row justify-between items-center pr-12 py-12">
            <div className="text-4xl md:text-5xl font-bold mb-4 text-center sm:text-left">
              {title}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <SearchBar query={query} setQuery={setQuery} />
              <UploadButton />
            </div>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center">
              <TabsList className="mb-2">
                <TabsTrigger value="grid" className="flex gap-2 items-center">
                  <GridIcon />
                  Grid
                </TabsTrigger>
                <TabsTrigger value="table" className="flex gap-2 items-center">
                  <RowsIcon /> Table
                </TabsTrigger>
              </TabsList>

              <div className="hidden sm:flex gap-0 sm:gap-2 items-center pr-12">
                <Label htmlFor="type-select">Type Filter</Label>
                <Select
                  value={type}
                  onValueChange={(newType) => {
                    setType(newType as any);
                  }}
                >
                  <SelectTrigger
                    id="type-select"
                    defaultValue={"All"}
                    className="w-[180px]"
                  >
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {!isLoading && !query && files.length === 0 && (
              <div className="flex items-center justify-center flex-col p-12">
                <Image
                  src="/empty.svg"
                  height="300"
                  width="300"
                  alt="No files found"
                />
                <div className="mt-8 text-xl text-center font-semibold text-slate-600">
                  This Folder is Empty. <br />
                  {favourites === false && deletedOnly === false ? (
                    <>
                      go ahead and Upload one.
                      <div className="mt-8">
                        <UploadButton />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
            <TabsContent value="grid">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pr-12 pt-2 auto-rows-max">
                {modifiedFiles?.map((file) => {
                  return <FileCard key={file._id} file={file} />;
                })}
              </div>
            </TabsContent>
            {!isLoading && !query && files.length === 0 ? (
              <div>
                <TabsContent value="table" hidden>
                  <DataTable columns={columns} data={modifiedFiles} />
                </TabsContent>
              </div>
            ) : (
              <div className="pr-12">
                <TabsContent value="table">
                  <DataTable columns={columns} data={modifiedFiles} />
                </TabsContent>
              </div>
            )}
          </Tabs>
        </>
      )}
    </>
  );
};

export default FileBrowser;
