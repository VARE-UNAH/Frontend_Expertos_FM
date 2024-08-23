import axios from 'axios';

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

  export const fetchUserProfile = async () => {
      // Obtener el token de localStorage
      const token = localStorage.getItem("accessToken");
  
      if (!token) {
        throw new Error("No se encontró ningún token en localStorage.");
      }
  
      // Realizar la solicitud GET para obtener el perfil del usuario
      const response = await axios.get<UserProfile>(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajusta el encabezado según tu configuración
        },
      });
  
      // Retornar la data obtenida
      return response.data;
  };
