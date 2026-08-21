'use client'
import { authClient } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, Card, Description, FieldError, Form, Input, Label, Radio, RadioGroup, TextField} from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogInPage = () => {
    const router = useRouter()
    const onSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        const {data,error} = await authClient.signIn.email({
            email : userData.email,
            password : userData.password,
            callbackURL:'/',
        });
        
        if(data){
            toast.success('Login Successful! Welcome')
        }if(error){
            toast.error('login failed')
        }

    }

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }

    return (
        <div className="min-h-screen w-full flex items-start sm:items-center justify-center bg-[#FAFAFA] px-4 py-8 sm:py-12">
            <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl p-5 sm:p-8 shadow-sm rounded-2xl">
                <h1 className="text-xl sm:text-2xl font-bold text-[#131B3A] mb-6">
                   Log in to StartupForge
                </h1>
                <Form className="flex flex-col gap-4 sm:gap-5" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="flex flex-col gap-1.5"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" className="w-full" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={6}
                        name="password"
                        type="password"
                        className="flex flex-col gap-1.5"
                        validate={(value) => {
                            if (value.length < 6) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Password must contain at least one lowercase letter";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" className="w-full" />
                        <Description className="text-xs sm:text-sm">
                            Must be at least 6 characters with 1 uppercase and 1 lowercase
                        </Description>
                        <FieldError />
                    </TextField>
                    <div className="mt-2">
                        <Button type="submit" className="w-full text-[#FAFAFA] font-bold text-[16px] bg-[#FF6B35] py-5">
                            Login
                        </Button>
                    </div>
                </Form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5 sm:my-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs sm:text-sm text-gray-400">or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Google login button */}
                <Button
                    onClick={handleGoogleSignIn}
                    type="button"
                    variant="secondary"
                    className="w-full flex items-center justify-center gap-2 border border-gray-200 py-5 font-medium text-[16px] text-[#131B3A] bg-white hover:bg-gray-50"
                >
                    <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                            s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                            s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039
                            l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                            c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                            c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24
                            C44,22.659,43.862,21.35,43.611,20.083z"/>
                    </svg>
                    Continue with Google
                </Button>
            </Card>
        </div>
    );
};

export default LogInPage;