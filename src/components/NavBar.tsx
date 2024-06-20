import MaxWidthWrapper from "./MaxWidthWrapper"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { getAuthSession } from "@/lib/auth"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
async function NavBar () {
    const session = await getAuthSession()
  return (
    <nav className="sticky h-15 rounded inset-x-0 top-1 ml-2 mr-2 z-30 w-auto bg-white/5 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between">
                <Link href='/' className="flex z-40 font-semibold">
                    <span>DocChat.</span>
                </Link>

            <div className="hidden items-center space-x-4 sm:flex">
                <>
                    <Link href='/pricing' className={buttonVariants({
                        variant: "ghost",
                        size: 'sm'
                    })}>Pricing </Link>

                    {/* {session? (<p>You are logged in</p>)
                            : <Link href='/sign-in' className={buttonVariants({
                                size:'sm'
                            })}>Sign-In </Link>} */}
                    <LoginLink className={cn(buttonVariants({
                        size:'sm'
                    }),"bg-purple-600 text-white hover:bg-purple-800")}>Sign In</LoginLink>
                    <RegisterLink className={cn(buttonVariants({
                        size:'sm'
                    }))}>Get started<ArrowRight className="ml-1.5 h-6 w-5"/></RegisterLink>
               

                </>
            </div>
            </div>
        </MaxWidthWrapper>
    </nav>
  )
}

export default NavBar