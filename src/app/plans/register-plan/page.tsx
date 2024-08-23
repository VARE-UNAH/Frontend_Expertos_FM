'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { createPlan, fetchPlans } from "@/services/plans/planService";
import { createClients } from "@/services/clients/clientsService";
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation";
import { useValidateToken } from "@/services/user/authService";

const TablesPage = () => {
  useValidateToken();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const plantData = {
      name: name,
      price: parseFloat(price),
      description: description
    };

    try {
      const result = await createPlan(plantData);

      if (result.error) {
        // Si el error es un arreglo de errores del backend
        if (Array.isArray(result.error)) {
          result.error.forEach((errorItem: { param: string; msg: string }) => {
            toast.error(`${errorItem.msg}`);
          });
        } else {
          // Muestra error genérico si no es un arreglo
          toast.error(result.error);
        }
      } else {
        toast.success('Plan registrado exitosamente');
        console.log(result.data);
        router.push('/plans/show-plans');
        // Opcionalmente, redirige o limpia el formulario aquí
      }
    } catch (error) {
      toast.error('Error inesperado al registrar el plan');
      console.error('Unexpected error:', error);
    }
  };

  return (
    <DefaultLayout>
      {loading ? (
        <Loader /> // Muestra el Loader mientras se carga
      ) : (
        <>

          <Link
            aria-controls="sidebar"
            className="block"
            href="/plans/show-plans"
          >
            <svg
              className="fill-current mb-5"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </Link>
          <Breadcrumb pageName="Ingresar Nuevo Plan" />
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Informacion del nuevo plan
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nombre del plan <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ingrese el nombre del plan"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Precio del plan <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      value={price}
                      required
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Ingrese el precio del plan"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Descripcion del plan
                    </label>
                    <textarea
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Default textarea"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Registrar Plan"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
            </form>
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default TablesPage;
