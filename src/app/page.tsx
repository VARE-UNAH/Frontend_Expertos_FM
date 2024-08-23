'use client';

import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Importamos el observador
import { auth } from "@/app/firebase/firebase"; // Importamos la instancia de autenticación
import Loader from "@/components/common/Loader";
import { useValidateToken } from "@/services/user/authService";
import { Toaster, toast } from 'sonner'

export default function Home() {
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const router = useRouter();
  useValidateToken();

  useEffect(() => {
    const checkAuth = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Obtenemos el token y su información
          const tokenResult = await user.getIdTokenResult(true); // 'true' para forzar la obtención de un token actualizado
          
          // Convertimos la fecha de expiración a un timestamp en segundos
          const expirationTime = new Date(tokenResult.expirationTime).getTime() / 1000;
          const currentTime = Date.now() / 1000; // Convertimos el tiempo actual a segundos

          // Verificamos si el token ha expirado
          if (expirationTime < currentTime) {
            // Si el token ha expirado, redirigimos al inicio de sesión
            router.push("/auth/signin");
          } else {
            setLoading(false); // Detenemos el estado de carga si el token es válido
            toast('Bienvenido Hector Varela')
            console.log("Bienvenido")
          }
        } else {
          // Redirigimos al login si no hay usuario autenticado
          router.push("/auth/signin");
        }
      });

      return () => unsubscribe();
    };

    checkAuth();
  }, [router]);

  if (loading) {
    // Mientras verificamos el usuario, mostramos un componente de carga
    return <Loader />;
  }

  // Renderizamos la página si no estamos cargando y hay un usuario autenticado
  return (
    <>
      <DefaultLayout>
        <ECommerce />
        
      </DefaultLayout>
    </>
  );
}
