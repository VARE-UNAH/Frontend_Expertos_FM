"use client";
import React, { useState, ReactNode } from "react";

import { Toaster, toast } from 'sonner'

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className="flex items-center justify-center min-h-screen">
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                    <Toaster position="top-right"/>
                </div>
            </main>
        </>
    );
}