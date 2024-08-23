import { PlanFormData } from '@/types/plan';
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

export const fetchEarnings = async () => {
  try {
    // Obtén el token almacenado en localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Verifica si el token existe
    if (!accessToken) {
      throw new Error("No access token found");
    }

    // Realiza la solicitud GET con el token en el encabezado de autorización
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/plans/earnings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Devuelve los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error("Failed to fetch earnings:", error);
    return [];
  }
};

export const fetchNumberPlans = async () => {
  try {
    // Obtén el token almacenado en localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Verifica si el token existe
    if (!accessToken) {
      throw new Error("No access token found");
    }

    // Realiza la solicitud GET con el token en el encabezado de autorización
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/plans/numberof`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Devuelve los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error("Failed to fetch number of plans:", error);
    return [];
  }
};

export const createPlan = async (planData: PlanFormData) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/plans`, planData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { data: response.data, error: null };
  } catch (error: any) {
    console.error("Failed to create plan:", error);

    // Verifica si el error proviene de Axios
    if (error.response) {
      // Error de la respuesta del servidor (por ejemplo, 400, 404)
      if (error.response.data?.errors) {
        return { data: null, error: error.response.data.errors };
      }

      return { data: null, error: error.response.data?.error || "Error del servidor" };
    } else if (error.request) {
      // No se recibió respuesta del servidor
      return { data: null, error: "No se recibió respuesta del servidor" };
    } else {
      // Otro tipo de error (configuración, etc.)
      return { data: null, error: "Error al intentar registrar el plan" };
    }
  }
};
