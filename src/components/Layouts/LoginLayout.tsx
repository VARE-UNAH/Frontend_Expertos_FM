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
            <main className="justify-center min-h-screen">
                    {children}
                    <Toaster position="top-right"/>
                
            </main>
        </>
    );
}