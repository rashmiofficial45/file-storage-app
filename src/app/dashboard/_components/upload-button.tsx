"use client";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import { useOrganization, useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
const createFileSchema = z.object({
  title: z.string().min(2).max(50),
  file: z
    .custom<FileList>((v) => v instanceof FileList, "Required")
    .refine((v) => v.length > 0, "Required"),
});

export const UploadButton = () => {
  const { toast } = useToast();

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const form = useForm<z.infer<typeof createFileSchema>>({
    resolver: zodResolver(createFileSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });
  const fileRef = form.register("file");

  async function onSubmit(values: z.infer<typeof createFileSchema>) {
    if (!orgId) return;
    const postUrl = await generateUploadUrl();
    const fileType = values.file[0].type;
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": fileType },
      body: values.file[0],
    });

    const { storageId } = await result.json();
    console.log(values);
    const types = {
      "image/jpeg": "image",
      "image/png": "image",
      "text/csv": "csv",
      "application/pdf": "pdf",
    } as Record<string, Doc<"files">["types"]>;
    console.log(types[fileType]);

    try {
      await createFile({
        name: values.title,
        orgId,
        fileId: storageId,
        types: types[fileType],
      });
      form.reset();
      setIsDialogOpen(false);
      toast({
        variant: "success",
        title: "File Uploaded Successfully",
        description: "Not everyone can view your File",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Unable to upload file right now, Try later!",
      });
    }
  }

  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    //Nullish coalescing operator (??)
    orgId = organization.organization?.id ?? user?.user?.id;
  }
  const createFile = useMutation(api.files.createFile);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-zinc-900">Upload File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your File Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DialogDescription>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange }, ...field }) => (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          placeholder="Enter your File Name"
                          {...fileRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
