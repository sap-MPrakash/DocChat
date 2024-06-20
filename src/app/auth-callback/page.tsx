"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { trpc } from "../_trpc/client"
import { Loader2 } from "lucide-react"
const Page = () => {
    // purpose is to sinc logged in user and also upate the database
    const router = useRouter()
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    const {isSuccess, isError, data, error} = trpc.authCallback.useQuery(undefined)
    if(isError){
        if(error.data?.code === 'UNAUTHORIZED'){
            
            router.push('/api/auth/login')
        }
    }

    if(isSuccess){
        if(data?.success){
            router.push(origin? `${origin}`: '/dashboard')
        }
    }

    return(
        <div className="w-full mt-24 flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-300"/>
                <h3 className="font-semibold text-xl">Setting up your account...</h3>
                <p>You will be redirected automatically</p>
            </div>
        </div>
    )
}
export default Page