import React from 'react'
import { SignupForm } from "@/components/signup-form"
import { GalleryVerticalEnd } from "lucide-react"
import AnimatedCharacters from '../components/login/AnimatedCharacters';
import '../styles/login.style.css'

const SignInPage = () => {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Tickets
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:flex lg:items-center lg:justify-center bg-gray-500">
                <div className="characters-section ">
                    <AnimatedCharacters className="absolute inset-0 h-full w-full object-cover " />
                </div>
                <div className="grid-overlay"></div>
                <div className="blur-circle blur-circle-1"></div>
                <div className="blur-circle blur-circle-2"></div>
            </div>

        </div>
    )
}

export default SignInPage