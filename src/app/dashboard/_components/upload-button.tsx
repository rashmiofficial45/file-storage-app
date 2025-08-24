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
import { useState, useEffect } from "react";
import { Loader2, Upload, FileText, CloudUpload } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";

const createFileSchema = z.object({
  title: z.string().min(2).max(50),
  file: z
    .custom<FileList>((v) => v instanceof FileList, "Required")
    .refine((v) => v.length > 0, "Required"),
});

export const UploadButton = () => {
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);

  // Responsive hook for mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        <Button className="h-9 sm:h-10 md:h-11 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-medium flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
          <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
          {isMobile ? "Upload" : "Upload File"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-3 sm:space-y-4">
          <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CloudUpload className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Upload New File
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-2 sm:px-0">
              Add a new file to your collection. Supported formats: PNG, JPG, PDF, CSV
            </DialogDescription>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 md:space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2 sm:space-y-3">
                  <FormLabel className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                    File Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a descriptive name for your file"
                      {...field}
                      className="h-9 sm:h-10 md:h-11 text-sm sm:text-base border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500 dark:focus:ring-green-400 transition-colors duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange }, ...field }) => (
                <FormItem className="space-y-2 sm:space-y-3">
                  <FormLabel className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                    Select File
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        placeholder="Choose a file to upload"
                        {...fileRef}
                        accept=".png,.jpg,.jpeg,.pdf,.csv"
                        className="h-9 sm:h-10 md:h-11 text-sm sm:text-base border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500 dark:focus:ring-green-400 transition-colors duration-200 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900/20 dark:file:text-green-400 file:transition-colors file:duration-200"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-9 sm:h-10 md:h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-medium text-sm sm:text-base flex items-center justify-center gap-2"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
              {form.formState.isSubmitting ? "Uploading..." : "Upload File"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
