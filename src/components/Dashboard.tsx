"use client"
import { FC, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import { trpc } from "@/app/_trpc/client"
import { Ghost, Plus, MessageSquare, Trash } from "lucide-react"
import UploadButton from "./UploadButton"
import {format} from "date-fns"
import Link from "next/link"
import { Button } from "./ui/button"

const Dashboard: FC  = () => {
    const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string|null>(null)
    
    const utils = trpc.useUtils()

    const {data: files, isLoading} = trpc.getUserFiles.useQuery(undefined)

    const mutation = trpc.deleteFile.useMutation()
    if(mutation.isSuccess){
        utils.getUserFiles.invalidate()
    }

    const deleteFile = mutation.mutate




    return(
        <main className="mx-auto p-4 max-w-7xl md:p-10">
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-b border-gray-800 pb-5 sm:flex-row sm:items-center sm:gap-0">
                <h1 className="mb-3 font-bold text-5xl text-gray-200">My Files</h1>
                <UploadButton/>
            </div>

             {files && files?.length !== 0?(

                <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
                    {files.sort((a,b) => new Date(b.createdAt).getTime()
                                        - new Date(a.createdAt).getTime())
                            .map((file)=>(
                                <li key={file.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
                                    
                                    {/* file name and link */}
                                    <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
                                        <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                                            <div className="flex-1 truncate">
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="truncate text-lg font-medium text-zinc-900">{file.name}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* file upload date */}
                                    <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                                        <div className="flex items-center gap-2">
                                            <Plus className="h-4 w-4 text-black"/>
                                                {format(new Date(file.createdAt), "yyyy-MM-dd")}    
                                            {/* <p>{file.createdAt}</p> */}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MessageSquare className='h-4 w-4'/>
                                            9999
                                        </div>

                                        <Button onClick={()=> deleteFile({id: file.id})} size='sm' className="w-full" variant='destructive'>
                                            <Trash className="h-4 w-4"/>
                                        </Button>
                                    </div>

                                </li>
                            ))}
                </ul>
             ):isLoading ?(
                 <Skeleton height={100} baseColor="transparent" highlightColor="#333" className="my-2" count = {3}/>
            ):(
                <div className="mt-16 flex flex-col items-center gap-2">
                    <Ghost className="h-8 w-8 text-zinc-300"/>
                    <h3 className="font-semibold text-xl text-gray-300">Pretty empty around here</h3>
                    <p className="text-gray-400">Let&apos;s upload your first PDF</p>
                </div>
             )}

        </main>
    )
} 
export default Dashboard
