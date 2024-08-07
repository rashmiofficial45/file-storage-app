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
} from "@clerk/nextjs";

const Home = () => {
  const { organization } = useOrganization();
  console.log(organization);
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(
    api.files.getFiles,
    organization?.id ? { orgId: organization.id } : "skip"
  );
  return (
    <div>
      <SignedIn>
        <SignOutButton>
          <button>Sign out</button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign in</button>
        </SignInButton>
      </SignedOut>
      {files?.map((file:any) => {
        return <div key={file._id}>{file.name}</div>;
      })}
      <Button
        onClick={() => {
          if (!organization) return;
          createFile({
            name: "Hello World",
            orgId: organization?.id,
          });
        }}
      >
        Click me
      </Button>

    </div>
  );
};

export default Home;
