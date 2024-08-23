'use client'
import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { useValidateToken } from "@/services/user/authService";


const BasicChartPage: React.FC = () => {
  useValidateToken();
  return (
    <DefaultLayout>
      <Chart />
    </DefaultLayout>
  );
};

export default BasicChartPage;
