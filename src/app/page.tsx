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
import { fetchUserProfile } from "@/services/user/userService";


interface Person {
  firstName: string;
  lastName: string;
}

interface UserProfile {
  user: {
    id: number;
    email: string;
    active: boolean;
    verified: boolean;
    firebaseUid: string;
  };
  person: Person;
}

export default function Home() {
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  useValidateToken();
  useEffect(() => {
    const loadUserProfile = async () => {
      const cachedProfile = localStorage.getItem("userProfile");
      if (cachedProfile) {
        setUserProfile(JSON.parse(cachedProfile));
        setLoading(false);
      } else {
        try {
          const userinfo = await fetchUserProfile();
          setUserProfile(userinfo);
          localStorage.setItem("userProfile", JSON.stringify(userinfo));
        } catch (err) {
          console.error("Error al obtener el perfil del usuario:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserProfile();
  }, []);
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

