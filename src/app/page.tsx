"use client"
import { api } from "../../convex/_generated/api";
import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { Button } from '@/components/ui/button';
import { getFiles } from "../../convex/files";

const Home = () => {
  const createFile = useMutation(api.files.createFile);
  const getFiles = useQuery(api.files.getFiles);
  return (
    <div>
      <SignedIn>
        <UserButton />
        <OrganizationSwitcher />
        <SignOutButton>
          <button>Sign out</button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign in</button>
        </SignInButton>
      </SignedOut>
      <Button onClick={() => createFile(
        {
          name: "Hello World",
        }
      )}>Click me</Button>
      {getFiles?.map(files=>{
        return <div key={files._id}>
      {files.name}
        </div>
      })}
    </div>
  );
};

export default Home;
