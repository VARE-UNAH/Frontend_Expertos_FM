"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useValidateToken } from "@/services/user/authService";
import { Pagination } from "antd";

const TablesPage = () => {
  useValidateToken();

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Clientes" />
      <div className="flex flex-row gap-5.5 p-6.5 pr-0 ps-0">
        <div>
          <input
            type="text"
            placeholder="Nombre, Plan"
            value={searchTerm} // Valor del input
            onChange={handleInputChange}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div>
          <input
            type="button"
            value={"Buscar"}
            className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          />
        </div>
        <div className="ml-auto">
          <Link
            href="/clients/register-client"
            className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            + Añadir cliente
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <TableOne searchTerm={searchTerm} />
        
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
