"use client";
import { UploadButton } from "./upload-button";
import FileCard from "./file-card";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
const Home = () => {
  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    //Nullish coalescing operator (??)
    orgId = organization.organization?.id ?? user?.user?.id;
  }
  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex justify-between p-12">
      <h1>My Files</h1>
      <div>
        <UploadButton />
      </div>
      </div>

      <div className="grid gap-4 grid-cols-4 p-12">
        {files?.map((file: any) => {
        return <FileCard key={file._id} file={file}/>
      })}
      </div>
    </main>
  );
};

export default Home;
