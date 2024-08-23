import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';

export const useValidateToken = () => {
    const router = useRouter();

    useEffect(() => {
        const validateToken = async () => {
            const authInstance = getAuth();
            const token = localStorage.getItem('accessToken');

            if (token) {
                try {
                    // Decodificar el payload del token
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    const now = Date.now() / 1000; // Convertir milisegundos a segundos
                    console.log(decodedToken)
                    if (decodedToken.exp < now) {
                        // El token ha expirado, cerrar sesión
                        throw new Error("El token ha expirado");
                    }

                    // El token es válido, continuar
                    console.log("Token válido");

                } catch (error) {
                    console.error("El token no es válido o ha expirado:", error);

                    // Manejar cierre de sesión y redirección
                    await signOut(authInstance); // Cerrar sesión de Firebase
                    localStorage.removeItem("user");
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("userProfile");
                    router.push('/auth/signin'); // Redirige al usuario al home o login
                }
            } else {
                // No hay token, limpiar y redirigir
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userProfile");
                router.push('/auth/signin'); // Redirige si no hay usuario
            }
        };

        validateToken();
    }, [router]);
};


