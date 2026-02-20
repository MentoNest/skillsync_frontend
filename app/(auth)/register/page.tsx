import Link from "next/link";
import React from "react";

export default function RegisterPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                <p className="text-muted-foreground">
                    Join SkillSync and start your journey today
                </p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="first-name"
                            className="text-sm font-medium leading-none"
                        >
                            First Name
                        </label>
                        <input
                            id="first-name"
                            placeholder="John"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="last-name"
                            className="text-sm font-medium leading-none"
                        >
                            Last Name
                        </label>
                        <input
                            id="last-name"
                            placeholder="Doe"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium leading-none"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                    />
                </div>

                <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full shadow-lg shadow-primary/20 active:scale-[0.98] transition-all duration-150"
                >
                    Sign Up
                </button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full active:scale-[0.98] transition-all duration-150"
                >
                    Google
                </button>
            </div>

            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                    Sign in
                </Link>
            </div>

            <p className="px-8 text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link href="#" className="underline underline-offset-4 hover:text-primary">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline underline-offset-4 hover:text-primary">
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    );
}
