// validation.ts

import { z } from 'zod';

export const clientSchema = z.object({
    DNI: z.number().int().positive('DNI debe ser un número positivo'),
    firstName: z.string().min(1, 'Nombre es obligatorio'),
    middleName: z.string().optional(),
    firstLastName: z.string().min(1, 'Primer apellido es obligatorio'),
    secondLastName: z.string().optional(),
    age: z.number().int().positive('Edad debe ser un número positivo').min(1, 'Edad debe ser al menos 1'),
    height: z.number().positive('Altura debe ser un número positivo'),
    planId: z.number().int().positive('ID de plan debe ser un número positivo'),
    email: z.string().email('Correo electrónico inválido'),
    phoneNumber: z.string().min(10, 'Número de teléfono inválido'),
    weight: z.number().positive('Peso debe ser un número positivo'),
    fatperc: z.number().min(0, 'Porcentaje de grasa debe ser al menos 0').max(100, 'Porcentaje de grasa no puede ser mayor a 100'),
});
