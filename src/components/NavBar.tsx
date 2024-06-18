import MaxWidthWrapper from "./MaxWidthWrapper"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
function NavBar() {
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
                    <Link href='/sign-in' className={buttonVariants({
                        size:'sm'
                    })}>Sign-In </Link>

                </>
            </div>
            </div>
        </MaxWidthWrapper>
    </nav>
  )
}

export default NavBar