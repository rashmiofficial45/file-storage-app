"use client";
import { UploadButton } from "../_components/upload-button";
import FileCard from "../_components/file-card";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import { useState } from "react";
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

type Props = {
  title: string;
  favourites?: boolean;
  deletedOnly?: boolean;
};

const FileBrowser = ({ title, favourites, deletedOnly }: Props) => {
  const [query, setQuery] = useState("");
  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    //IMP:Nullish coalescing operator (??)
    orgId = organization.organization?.id ?? user?.user?.id;
  }
  const allFavourites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query, favourites, deletedOnly } : "skip"
  );
  const isLoading = files === undefined;
  if (files === null) return <div>Something went wrong</div>;
  if (!allFavourites) {
    return <div>Something went wrong</div>;
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
        <div className="flex mx-auto justify-center mt-32 flex-col p-12">
          <Loader2 className="text-slate-500 mx-auto h-32 w-32 animate-spin" />
          <div className="mt-8 text-center font-semibold text-xl text-slate-600">
            Your Files are Loading...
          </div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center  pr-12 py-12 ">
            <div className="text-4xl md:text-5xl font-bold mb-4 text-center sm:text-left">
              {title}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <SearchBar query={query} setQuery={setQuery} />
              <UploadButton />
            </div>
          </div>

          <Tabs defaultValue="grid">
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

              <div className="hidden sm:flex gap-0 sm:gap-2  items-center pr-12">
                <Label htmlFor="type-select">Type Filter</Label>
                <Select
                // value={type}
                // onValueChange={(newType) => {
                //   setType(newType as any);
                // }}
                >
                  <SelectTrigger id="type-select" className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
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
                  This Folder is Empty . <br />
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
        <TabsContent value="table">
          <DataTable columns={columns} data={modifiedFiles} />
        </TabsContent>

          </Tabs>
        </>
      )}
    </>
  );
};

export default FileBrowser;
