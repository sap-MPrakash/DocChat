import { FC } from "react";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignIn :FC = () => {
    return (
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
                <p className="font-bold">DocChat</p>
                <h1 className="text-purple-600 text-2xl font-semibold tracking-tight">Welcome back</h1>
                <p className="text-sm max-w-xs mx-auto">
                    By continuing, you are setting up a DocChat account and agree to our User Agreement and Privacy Policy.
                </p>

                <UserAuthForm className=""/>
                <p className="px-8 text-center text-sm text-size-700">
                    New to DocChat?{' '}
                    <Link href='/sign-up' className='hover:text-purple-500 text-sm underline underline-offset-4'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}
export default SignIn