"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const InsufficientCreditsModal = () => {
    const router = useRouter();

    return (
        <AlertDialog defaultOpen>
            <AlertDialogContent className="max-w-md sm:max-w-lg">
                <AlertDialogHeader>
                    <div className="flex-between">
                        <p className="p-16-semibold text-dark-400">Insufficient Credits</p>
                        <AlertDialogCancel
                            className="border-0 p-0 hover:bg-transparent"
                            onClick={() => router.push("/profile")}
                        >
                            <Image
                                src="/assets/icons/close.svg"
                                alt="close"
                                width={24}
                                height={24}
                                className="cursor-pointer"
                            />
                        </AlertDialogCancel>
                    </div>

                    <div className="flex justify-center w-full">
                        <Image
                            src="/assets/images/stacked-coins.png"
                            alt="credit coins"
                            width={462}
                            height={122}
                            className="max-w-full h-auto"
                        />
                    </div>

                    <AlertDialogTitle className="p-24-bold text-dark-600">
                        Oops.... Looks like you&#39;ve run out of free credits!
                    </AlertDialogTitle>

                    <AlertDialogDescription className="p-16-regular py-3 text-dark-400">
                        No worries, though - you can keep enjoying our services by grabbing
                        more credits.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-3">
                    <AlertDialogCancel
                        className="button w-full bg-purple-100 text-dark-400 sm:w-auto sm:flex-1"
                        onClick={() => router.push("/profile")}
                    >
                        No, Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="button w-full bg-purple-gradient bg-cover text-white sm:w-auto sm:flex-1"
                        onClick={() => router.push("/credits")}
                    >
                        Yes, Proceed
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};