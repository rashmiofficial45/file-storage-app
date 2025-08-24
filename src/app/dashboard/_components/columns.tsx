"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Doc, Id } from "../../../../convex/_generated/dataModel"
import { formatRelative } from "date-fns"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import FileCardAction from "./file-action"
import { FileText, Image as ImageIcon, FileSpreadsheet, Calendar, User, MoreHorizontal } from "lucide-react"

function UserCell({ userId }: { userId: Id<"users"> }) {
  const user = useQuery(api.users.getUserProfile, { userId: userId })

  if (!user) return (
    <div className="flex items-center gap-3">
      <Avatar className="w-8 h-8 border-2 border-gray-200 dark:border-gray-700">
        <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium">
          U
        </AvatarFallback>
      </Avatar>
      <span className="text-sm text-gray-500 dark:text-gray-400">Loading...</span>
    </div>
  )

  return (
    <div className="flex items-center gap-3">
      <Avatar className="w-8 h-8 border-2 border-gray-200 dark:border-gray-700 shadow-sm">
        <AvatarImage className="object-cover" src={user?.image} />
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-medium">
          {user?.name?.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
          {user?.name || "Unknown User"}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">User</span>
      </div>
    </div>
  )
}

function FileTypeCell({ type }: { type: Doc<"files">["types"] }) {
  const typeConfig = {
    image: {
      icon: <ImageIcon className="h-4 w-4 text-blue-600" />,
      label: "Image",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-300",
      borderColor: "border-blue-200 dark:border-blue-700"
    },
    csv: {
      icon: <FileSpreadsheet className="h-4 w-4 text-green-600" />,
      label: "CSV",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-700 dark:text-green-300",
      borderColor: "border-green-200 dark:border-green-700"
    },
    pdf: {
      icon: <FileText className="h-4 w-4 text-red-600" />,
      label: "PDF",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-700 dark:text-red-300",
      borderColor: "border-red-200 dark:border-red-700"
    }
  }

  const config = typeConfig[type]

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
      {config.icon}
      {config.label}
    </div>
  )
}

function DateCell({ date }: { date: number }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
      <Calendar className="h-4 w-4 text-gray-400" />
      <span className="font-medium">{formatRelative(new Date(date), new Date())}</span>
    </div>
  )
}

export const columns: ColumnDef<Doc<"files"> & { url: string | null; isFavourited: boolean }>[] = [
  {
    accessorKey: "name",
    header: "File Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
            {row.original.types === "image" && <ImageIcon className="h-5 w-5 text-blue-600" />}
            {row.original.types === "csv" && <FileSpreadsheet className="h-5 w-5 text-green-600" />}
            {row.original.types === "pdf" && <FileText className="h-5 w-5 text-red-600" />}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
              {row.original.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {row.original.types === "image" ? "Image file" : row.original.types === "csv" ? "Spreadsheet" : "Document"}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "types",
    header: "Type",
    cell: ({ row }) => {
      return <FileTypeCell type={row.original.types} />
    },
  },
  {
    header: "Uploaded By",
    cell: ({ row }) => {
      return <UserCell userId={row.original.userId} />
    },
  },
  {
    header: "Date Added",
    cell: ({ row }) => {
      return <DateCell date={row.original._creationTime} />
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div
          className="flex items-center justify-center"
          onClick={(e) => e.stopPropagation()} // Prevent row click when action buttons are clicked
        >
          <FileCardAction file={row.original} />
        </div>
      )
    },
  },
]
