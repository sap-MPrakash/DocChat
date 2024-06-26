"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Loader2 } from "lucide-react";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useToast } from "./ui/use-toast";
import {useResizeDetector} from "react-resize-detector"
import { Input } from "./ui/input";
import {useForm} from "react-hook-form"
import {z} from 'zod'
import { cn } from "@/lib/utils";
import {zodResolver} from '@hookform/resolvers/zod'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import { DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Search } from "lucide-react";
import SimpleBar from "simplebar-react"
import { RotateCw } from "lucide-react";
import PdfFullScreen from "./PdfFullscreen";

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.js', import.meta.url).toString()

interface PdfRendererPropsType{
    pdfPath: string
}

const PdfRenderer = ({ pdfPath }: PdfRendererPropsType) => {
    const {toast} = useToast()
    const [numPages, setNumPages] = useState<number>()
    const [currPage, setCurrPage] = useState<number>(1)
    const [scale, setScale] = useState<number>(1)
    const [rotation, setRotation] = useState<number>(0)
    const [renderedScale, setRenderedScale] = useState<number|null>(null)
    const isLoading = renderedScale !== scale

    const CustomPageValidator = z.object({
        page: z.string().refine((num)=>{
            return Number(num)>0 && Number(num)<=numPages!
        })
    })
    type TCustomPageValidator = z.infer<typeof CustomPageValidator>
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<TCustomPageValidator>({
        defaultValues: {
            page: "1"
        }, resolver: zodResolver(CustomPageValidator)
    })

    const {width, ref} = useResizeDetector()

    const handlePageSubmit = ({page}: TCustomPageValidator) => {
        setCurrPage(Number(page))
        setValue("page", String(page))
    }


  return (
    <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
        <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
            <div className='flex items-center gap-1.5'>
                <Button className="text-gray-500" variant='ghost' aria-label="previous page"
                    disabled={currPage<=1}
                    onClick={()=>{
                        setCurrPage((prev)=> (prev-1>1 ? prev-1 : 1))
                        setValue("page", String(currPage-1))
                    }}>
                    <ChevronDown className="h-4 w-4"/>
                </Button>

                <div className="flex items-center gap-1.5">
                    <Input {...register("page")}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter"){
                            handleSubmit(handlePageSubmit)()
                        }
                    }}
                    className={cn("w-12 h-8 bg-zinc-200 border-zinc-400 text-zinc-900", errors.page && "focus-visible:ring-red-500")}/>
                    <p className="text-zinc-900 text-sm space-x-1">
                        <span>/</span>
                        <span>{numPages?? "x"}</span>
                    </p>
                </div>

                <Button className="text-gray-500" variant='ghost' aria-label="next page"
                    disabled={numPages === undefined || currPage === numPages}
                    onClick={() =>{
                        setCurrPage((prev) => prev + 1> numPages! ? numPages! : prev+1)
                        setValue("page", String(currPage+1))
                    }}>
                    <ChevronUp className="h-4 w-4"/>
                </Button>
            </div>
            <div className="space-x-2">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className='gap-1.5 text-gray-500'
                aria-label='zoom'
                variant='ghost'>
                <Search className='h-4 w-4' />
                {scale * 100}%
                <ChevronDown className='h-3 w-3 opacity-50' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => setScale(0.75)}>
                75%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className="text-gray-500"
            onClick={() => setRotation((prev) => prev + 90)}
            variant='ghost'
            aria-label='rotate 90 degrees'>
            <RotateCw className='h-4 w-4' />
          </Button>
            
            <PdfFullScreen pdfPath={pdfPath}/>
            
            </div>
        </div>

        <div className="flex-1 w-full max-h-screen text-gray-600">
            <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">

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
                    onLoadSuccess={({numPages})=> setNumPages(numPages)}
                    file={pdfPath} className='max-h-full'>
                        {isLoading && renderedScale ? (
                            <Page  width={width? width : 1} pageNumber={currPage} scale={scale} rotate={rotation} key={"@" + renderedScale}/>
                        ) : null}

                            <Page className={cn(isLoading? "hidden":"")}  width={width? width : 1} pageNumber={currPage} scale={scale} rotate={rotation}
                                key={"@" + scale}
                                loading={
                                    <div className="flex justify-center">
                                        <Loader2 className="my-24 h-6 w-6 animate-spin"/>
                                    </div>
                                } onRenderSuccess={()=> setRenderedScale(scale)}/>
                    </Document>
                </div>

            </SimpleBar>
        </div>

    </div>
  );
};

export default PdfRenderer;