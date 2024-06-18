import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";
import SignIn from "@/components/SignIn";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const page: FC = ()=>{
    return(
        <div className="absolute inset-0">
            <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
                <Link href='/' className={cn(buttonVariants({
                    variant:'ghost'
                }), 'self-start -mt-20')}>
                    <ArrowLeft className="mr-1 h-4 w-5"/> Home 
                </Link>
                <SignIn/>
            </div>

        </div>
    ) 
}
export default page