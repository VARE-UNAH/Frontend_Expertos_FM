'use client'
import { fetchClients } from "@/services/clients/clientsService";
import { Client } from "@/types/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

interface TableOneProps {
  searchTerm: string;
}

const TableOne: React.FC<TableOneProps> = ({ searchTerm }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const getClients = async () => {
      const data = await fetchClients();
      setClients(data); // Data es un array de objetos Client
      setIsLoading(false);
    };
    getClients();
  }, []);

  const filteredClients = clients.filter(client =>
    `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client?.plan?.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-10">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-xsm font-medium uppercase xsm:text-base">
              NOMBRE
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              PLAN
            </h5>
          </div>
          <div className="p-1.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              EDAD
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-xs font-medium uppercase xsm:text-base">
              ALTURA
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              PESO
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              IMC
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              %GRASA
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              HORARIO
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              #ENTRENOS
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              #FALTAS
            </h5>
          </div>
        </div>

        {filteredClients.map((client, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-10 ${
              key === filteredClients.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {client.firstName} {client.lastName}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white text-sm">{client.plan?.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white text-sm">{client.age}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white text-sm" >{client.height} cm</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white text-sm">{client.weightCurrent} lbs</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white text-sm">{client.IMCCurrent}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white text-sm">{client.fatCurrent} %</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white text-sm"> {client.TrainingPlan ? `${client.iHourString}-${client.fHourString}` : 'N/A'}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white text-sm" >
                {client.trainedDaysCount}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white text-sm">
              {client.nonTrainedDaysCount}
              </p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;