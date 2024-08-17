"use client";
import { UploadButton } from "../_components/upload-button";
import FileCard from "../_components/file-card";
import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "../_components/search-bar";
type Props = {
    title:string,
    favourites?:boolean
}

const FileBrowser = ({title , favourites}: Props) => {
    const [query, setQuery] = useState("");
  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    //IMP:Nullish coalescing operator (??)
    orgId = organization.organization?.id ?? user?.user?.id;
  }
  const files = useQuery(api.files.getFiles, orgId ? { orgId, query , favourites} : "skip");
  const isLoading = files === undefined;
  if (files === null) return <div>Something went wrong</div>
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
              <div className="flex justify-between p-12">
                <div className="text-5xl font-bold">{title}</div>
                <div>
                  <SearchBar query={query} setQuery={setQuery} />
                </div>
                <div>
                  <UploadButton />
                </div>
              </div>
              {!isLoading && !query && files.length === 0 && (
                <div className="flex mx-auto justify-center flex-col p-12">
                  <Image
                    src="/empty.svg"
                    height="300"
                    width="300"
                    alt="No files found"
                  />
                  <div className="mt-8 text-xl text-center font-semibold text-slate-600">
                    You have no Files, <br />
                    go ahead and Upload one.
                    <div className="mt-8">
                      <UploadButton />
                    </div>
                  </div>
                </div>
              )}
              <div className="grid gap-4 grid-cols-3 p-12">
                {files?.map((file: any) => {
                  return <FileCard key={file._id} file={file} />;
                })}
              </div>
            </>
          )}
    </>
  )
}

export default FileBrowser