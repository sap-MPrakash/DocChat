"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { Loader2 } from "lucide-react";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useToast } from "./ui/use-toast";
import {useResizeDetector} from "react-resize-detector"

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.js', import.meta.url).toString()

interface PdfRendererPropsType{
    pdfPath: string
}

const PdfRenderer = ({ pdfPath }: PdfRendererPropsType) => {
    const {toast} = useToast()

    const {width, ref} = useResizeDetector()


  return (
    <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
        <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
            <div className='flex items-center gap-1.5'>
                <Button aria-label="previous page">
                    <ChevronDown className="h-4 w-4"/>
                </Button>

                <div className="flex items-center gap-1.5">
                </div>
            </div>
        </div>

        <div className="flex-1 w-full max-h-screen text-gray-600">
            <div ref={ref}>
                <Document loading={
                    <div className="flex justify-center"><Loader2 className="my-24 h-6 w-6 animate-spin"/></div>
                } onLoadError={()=>{
                    toast({
                        title: 'Error loading PDF',
                        description: 'Please try again later',
                        variant: 'destructive',
                    })
                }}
                 file={pdfPath} className='max-h-full'>
                    <Page width={width? width : 1} pageNumber={1}/>
                </Document>
            </div>
        </div>

    </div>
  );
};

export default PdfRenderer;