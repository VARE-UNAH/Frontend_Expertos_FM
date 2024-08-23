export interface Plan {
    id: number;         // Correspondiente a un campo `int` en Prisma
    name: string;       // Correspondiente a un campo `string` en Prisma
    price: number;      // Correspondiente a un campo `double` en Prisma (en TypeScript, `number` abarca tanto enteros como flotantes)
    description: string; // Correspondiente a un campo `string` en Prisma
    numberClients: number;
  }

  export interface PlanFormData {        // Correspondiente a un campo `int` en Prisma
    name: string;       // Correspondiente a un campo `string` en Prisma
    price: number;      // Correspondiente a un campo `double` en Prisma (en TypeScript, `number` abarca tanto enteros como flotantes)
    description: string; // Correspondiente a un campo `string` en Prisma
  }

  export interface earnings {
    totalGanancias: number;
  }

  export interface numberPlans {
    totalPlanes: number;
  }