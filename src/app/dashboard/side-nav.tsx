import { Button } from '@/components/ui/button'
import { FileIcon, StarIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const SideNav = (props: Props) => {
  return (
    <>
        <div className="flex flex-col mt-40 gap-4">
        <Link href={"/dashboard/files"}>
        <Button variant="link" className="flex items-center justify-center gap-4 text-2xl p-4"><FileIcon/>All Files</Button>
        </Link>
        <Link href={"/dashboard/favourites"}>
        <Button variant={"link"} className="flex items-center justify-center gap-4 text-2xl p-4"><StarIcon/>Favourites</Button>
        </Link>
        <Link href={"/dashboard/trash"}>
        <Button variant={"link"} className="flex items-center justify-center gap-4 text-2xl p-4"><Trash2Icon/>Trash</Button>
        </Link>
        </div>
    </>
  )
}

export default SideNav