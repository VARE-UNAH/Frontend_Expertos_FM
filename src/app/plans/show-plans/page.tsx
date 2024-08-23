'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useValidateToken } from "@/services/user/authService";
import TableTwo from "@/components/Tables/TableTwo";


const TablesPage = () => {
  useValidateToken();

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (

    <DefaultLayout>
      <Breadcrumb pageName="Planes" />
      <div className="flex flex-row gap-5.5 p-6.5 ps-0 pr-0">
        <div>
          <input
            type="text"
            placeholder="Nombre"
            value={searchTerm}  // Valor del input
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
            href="/plans/register-plan"
            className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            + Añadir plan
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-10">

        <TableTwo searchTerm={searchTerm} />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
