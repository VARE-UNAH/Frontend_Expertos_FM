'use client'
import React, { useState } from "react";
import Link from "next/link";
import LoginLayout from "@/components/Layouts/LoginLayout";
import RegisterForm from "@/components/Forms/registerForm";


const contact = () => {

    return(
        <LoginLayout>
            <RegisterForm/>
        </LoginLayout>
    );

};

export default contact;