'use client'
import { fetchClients } from "@/services/clients/clientsService";
import { Plan } from "@/types/plan";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { fetchPlans } from "@/services/plans/planService";

interface TableOneProps {
  searchTerm: string;
}

const TableTwo: React.FC<TableOneProps> = ({ searchTerm }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const getClients = async () => {
      const data = await fetchPlans();
      setPlans(data); // Data es un array de objetos Client
      setIsLoading(false);
    };
    getClients();
  }, []);

  const filteredPlans = plans.filter(plan =>
    `${plan.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <Loader />; // Mostrar un mensaje mientras carga
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Clientes
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              NOMBRE
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              DESCRIPCION
            </h5>
          </div>
          <div className="p-1.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              PRECIO
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase xsm:text-base">
              #CLIENTES
            </h5>
          </div>
        </div>

        {filteredPlans.map((plan, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === filteredPlans.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {plan.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white text-sm">{plan?.description}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white text-sm">L.{plan.price}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white text-sm" >{plan.numberClients}</p>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTwo;