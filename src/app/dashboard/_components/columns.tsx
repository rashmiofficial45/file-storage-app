"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Doc, Id } from "../../../../convex/_generated/dataModel"
import { formatRelative } from "date-fns"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import FileCardAction from "./file-action"

function UserCell({ userId }: { userId: Id<"users"> }) {
  const user = useQuery(api.users.getUserProfile, { userId: userId })

  if (!user) return []
  return <div className="flex items-center gap-2 text-xs text-gray-700 w-full sm:w-auto">
  <Avatar className="w-8 h-8 border border-gray-300 rounded-full overflow-hidden">
    <AvatarImage className="object-cover" src={user?.image} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <span className="truncate">{user?.name}</span>
</div>
}


export const columns: ColumnDef<Doc<"files"> & { url: string | null; isFavourited: boolean }>[] = [
  {
    header: "User",
    cell: ({ row }) => {
      return <UserCell userId={row.original.userId} />
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "types",
    header: "Type",
  },
  {
    header: "Uploaded at",
    cell: ({ row }) => {
      return <div className="font-medium">{formatRelative(new Date(row.original._creationTime), new Date())}</div>
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return <FileCardAction file={row.original} />
    },
  },

]
