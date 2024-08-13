"use client";
import { UploadButton } from "./upload-button";
import FileCard from "./file-card";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Loader2 } from "lucide-react";
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

      { files === undefined &&(
        <div className="flex mx-auto justify-center mt-32 flex-col p-12">
            <Loader2 className="text-slate-500 mx-auto h-32 w-32 animate-spin" />
            <div className="mt-8 text-center font-semibold text-xl text-slate-600">
              Your Files are Loading...
            </div>
        </div>
      )
      }
      {files && files.length === 0 && (
        <div className="flex mx-auto justify-center flex-col p-12">
          <Image
            src="/emptyfile.png"
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

{files && files.length > 0 && (
  <>
      <div className="flex justify-between p-12">
        <div className="text-5xl font-bold">My Files</div>
        <div>
          <UploadButton />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-4 p-12">
        {files?.map((file: any) => {
          return <FileCard key={file._id} file={file} />;
        })}
      </div>
      </>
)}
    </main>
  );
};

export default Home;
