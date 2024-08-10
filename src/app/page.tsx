"use client";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useOrganization,
  useUser,
} from "@clerk/nextjs";

const Home = () => {
  const organization = useOrganization();
  const user = useUser()
  // console.log(organization);
  // console.log(user);

  let orgId:string | undefined = undefined
  if (organization.isLoaded && user.isLoaded) {
    //Nullish coalescing operator (??)
    orgId = organization.organization?.id ?? user?.user?.id
  }
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId } : "skip"
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {files?.map((file:any) => {
        return <div key={file._id}>{file.name}</div>;
      })}
      <Button
        onClick={() => {
          if (!orgId) return;
          createFile({
            name: "hello world",
            orgId,
          });
        }}
      >
        Click Me
      </Button>
    </main>
  );
};

export default Home;
