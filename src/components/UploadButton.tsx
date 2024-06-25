"use client"
import React, { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog"
import { Cloud, File, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import Dropzone from "react-dropzone"
import { useUploadThing } from "@/lib/uploadthingHelper"
import { useToast } from "./ui/use-toast"
import { trpc } from "@/app/_trpc/client"
import { useRouter } from "next/navigation"

const UploadDropzone = () => {
    const router = useRouter()
    const [isUploading, setIsUploading] = useState<boolean>(false) 
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const { toast }= useToast()

    const {startUpload} = useUploadThing("pdfUploader")

    const {mutate: startPolling} = trpc.getFile.useMutation({
        onSuccess: (file) => {
            router.push(`/dashboard/${file.id}`)
        },
        retry: true,
        retryDelay: 500,
    })

    const startSimulatedProgress = () => {
        setUploadProgress(0)

        const interval = setInterval(() => {
            setUploadProgress( (prev) => {
                if(prev >= 95){
                    clearInterval(interval)
                    return prev
                }
                return prev + 5
            })
        }, 500)

        return interval
    }

    return (
        <Dropzone multiple={false} onDrop={async (acceptedFile) => {
            setIsUploading(true)
            const progressInterval = startSimulatedProgress()

            const res = await startUpload(acceptedFile)
            console.log(res)
            if(!res){
                return toast({
                        title: "Something went wrong",
                        description: "Please try again",
                        variant: "destructive"
                    })
            }
            const [fileResponse] = res
            const key = fileResponse?.key

            if(!key){
                return toast({
                    title: "Something went wrong",
                    description: "Please try again",
                    variant: "destructive"
                })
            }
            
            clearInterval(progressInterval)
            setUploadProgress(100)
            startPolling({key})
        }}>
            { ({getRootProps, getInputProps, acceptedFiles}) => (
                <div {...getRootProps()} className="h-64 m-4 border-dashed border-2 border-gray-500 rounded-lg">
                    <div className="flex items-center justify-center h-full w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-800">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Cloud className="h-7 w-7 text-zinc-400 mb-2"/>
                                <p className="mb-2 text-sm text-zinc-400">
                                    <span className="font-bold">Click to upload</span>{' '}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-zinc-500">PDF (up to 4MB)</p>
                            </div>

                            {acceptedFiles && acceptedFiles[0] ? ( 
                                <div className="max-w-xs bg-gray-200 flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                                    <div className="px-3 py-2 h-full border-r border-gray-400 grid place-items-center">
                                        <File className='h-4 w-4 text-blue-500'/>
                                    </div>
                                    <div className="text-zinc-900 px-3 py-2 h-full text-sm truncate">
                                        {acceptedFiles[0].name}
                                    </div>
                                </div>
                             ): null}

                             {isUploading ? (
                                <div className="w-full mt-4 max-w-xs mx-auto">
                                    <Progress value={uploadProgress} className="h-1 w-full bg-zinc-600"/>
                                    {uploadProgress === 100 ? (
                                        <div className="flex gap-1 items-center justify-center text-sm text-zinc-200 text-center">
                                            <Loader2 className="h-3 w-3 animate-spin"/>Redirecting....
                                        </div>
                                    ): null}
                                </div>
                             ): null}
                             {/* <input {...getInputProps} type="file" id='dropzone-file' className="hidden" /> */}
                        </label>
                    </div>
                </div>
            )}
        </Dropzone>
    )
}

const  UploadButton: React.FC = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false)

    return(
        <Dialog open={isOpen} onOpenChange={(visible)=> {
            if(!visible){
                setIsOpen(visible)
            }
        }}>
            <DialogTrigger onClick={()=> setIsOpen(true)} asChild>
                <Button className="bg-blue-800 text-gray-200 hover:bg-blue-900"> Upload PDF</Button>
            </DialogTrigger>

            <DialogContent>
            <DialogTitle className="hidden"></DialogTitle>
                {UploadDropzone()}
            </DialogContent>
        </Dialog>
    )
}

export default UploadButton