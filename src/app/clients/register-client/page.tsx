'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import { Plan } from "@/types/plan";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import MultiSelect from "@/components/FormElements/MultiSelect";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { fetchPlans } from "@/services/plans/planService";
import { createClients } from "@/services/clients/clientsService";
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation";
import { useValidateToken } from "@/services/user/authService";

const TablesPage = () => {
  useValidateToken();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [edad, setEdad] = useState("");
  const [altura, setAltura] = useState("");
  const [weight, setWeight] = useState("");
  const [IMC, setIMC] = useState("");
  const [fat, setFat] = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    const getPlans = async () => {
      const data = await fetchPlans();
      setPlans(data); // Data es un array de objetos Client
    };
    getPlans();
  }, []);
  useEffect(() => {
    // Calcula el IMC cuando cambian la altura o el peso
    if (altura && weight) {
      const heightInMeters = parseFloat(altura) / 100;
      const imcValue = ((parseFloat(weight) / 2.2) / (heightInMeters * heightInMeters)).toFixed(2);
      setIMC(imcValue);
    }
  }, [altura, weight]);
  const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlanId = Number(event.target.value);
    const plan = plans.find(p => p.id === selectedPlanId);
    setSelectedPlan(plan);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientData = {
      DNI: dni,
      firstName: nombres.split(' ')[0] || '',
      middleName: nombres.split(' ')[1] || '', // Si tienes campo adicional para nombre intermedio
      firstLastName: apellidos.split(' ')[0] || '', // Ajusta según la estructura de nombre
      secondLastName: apellidos.split(' ')[1] || '', // Ajusta según la estructura de nombre
      age: parseInt(edad),
      height: parseInt(altura),
      planId: selectedPlan?.id || 0,
      email,
      IMC: parseFloat(IMC),
      phoneNumber,
      weight: parseInt(weight),
      fatperc: parseFloat(fat),
    };

    try {
      const result = await createClients(clientData);
  
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
        toast.success('Cliente registrado exitosamente');
        console.log(result.data);
        router.push('/clients/show-clients');
        // Opcionalmente, redirige o limpia el formulario aquí
      }
    } catch (error) {
      toast.error('Error inesperado al registrar el cliente');
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
            href="/clients/show-clients"
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
          <Breadcrumb pageName="Register" />
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Informacion del nuevo cliente
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      No. Identificación <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      value={dni}
                      required
                      onChange={(e) => setDni(e.target.value)}
                      placeholder="Ingrese el No. Identificación (DNI o Pasaporte)"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nombres <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ingrese los nombres"
                      value={nombres}
                      required
                      onChange={(e) => setNombres(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Apellidos <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ingrese los apellidos"
                      value={apellidos}
                      required
                      onChange={(e) => setApellidos(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Ingrese el correo electroncico"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      No. Celular <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Ingrese el No. Celular"
                      value={phoneNumber}
                      required
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Edad <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Ingrese edad 1 y 100"
                      value={edad}
                      required
                      onChange={(e) => setEdad(e.target.value)}
                      min="1"
                      max="100"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Altura (cm)<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Ingrese la altura en cm"
                      value={altura}
                      required
                      onChange={(e) => setAltura(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="border-b border-stroke py-4 mb-4.5 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Datos de progreso inicial
                  </h3>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Peso (lb)<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Ingrese el peso en lb"
                      value={weight}
                      required
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      IMC <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="IMC calculado automaticamente"
                      value={IMC}
                      required
                      disabled
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      %Grasa corporal <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Ingrese el porcentaje de grasa corporal"
                      min="1"
                      max="100"
                      required
                      value={fat}
                      onChange={(e) => setFat(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>


                </div>
                <div className="border-b border-stroke py-4 mb-4.5 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Facturacion
                  </h3>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-full">
                    <select
                      onChange={handlePlanChange} className="w-full rounded border-[1.5px] border-stroke bg-trans parent px-5 py-3 text-body outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-bodydark dark:focus:border-primary">
                      <option
                        className="text-body dark:text-bodydark" value="" disabled>Seleccione el plan</option>
                      {plans.map((plan) => (
                        <option key={plan.id} className="text-body dark:text-bodydark" value={plan.id}>
                          {plan.name}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>
                <div className={`mb-4.5 flex flex-col gap-6 xl:flex-row ${selectedPlan ? '' : 'hidden'}`}>
                  <div className="w-full xl:w-full">
                    Precio para el cliente: <span>{`L.${selectedPlan?.price}`}</span>
                  </div>

                </div>
                <div className={`mb-4.5 flex flex-col gap-6 xl:flex-row ${selectedPlan ? '' : 'hidden'}`}>
                  <div className="w-full xl:w-full">
                    Descripcion: <span>{`${selectedPlan?.description}`}</span>
                  </div>

                </div>

                <input
                  type="submit"
                  value="Registrar Cliente"
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
