"use client"
import React, { useState } from "react"
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"

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
                Upload PDF
            </DialogContent>
        </Dialog>
    )
}

export default UploadButton