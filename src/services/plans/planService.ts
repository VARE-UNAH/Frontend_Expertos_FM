import axios from 'axios';

export const fetchPlans = async () => {
    try {
      // Obtén el token almacenado en localStorage
      const accessToken = localStorage.getItem('accessToken');
  
      // Verifica si el token existe
      if (!accessToken) {
        throw new Error("No access token found");
      }
  
      // Realiza la solicitud GET con el token en el encabezado de autorización
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/plans/trainer`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      // Devuelve los datos de la respuesta
      return response.data;
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      return [];
    }
  };