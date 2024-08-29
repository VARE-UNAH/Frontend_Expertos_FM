// src/types.ts

export interface Client {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  secondLastName: string | null;
  age: number;
  phoneNumber: string;
  email: string;
  height: number;
  weightInitial: number | null;
  weightCurrent: number | null;
  IMCInitial: number | null;
  IMCCurrent: number | null;
  fatInitial: number | null;
  fatCurrent: number | null;
  iHourString: string | null;
  fHourString: string | null;
  trainedDaysCount: number | null;
  nonTrainedDaysCount: number | null;
  progress: {
    date: string;
    fatperc: number;
    IMC: number;
    weight: number;
  }[];
  plan: {
    name: string | null;
  } | null;
  TrainingPlan: {
    IH: number;
    FH: number;
  };
}

export interface ClientResponse {
  clients: Client[];
  totalItems: number;
  pageSize: number;
}

export interface ClientFormData {
  DNI: string;
  firstName: string;
  middleName: string;
  firstLastName: string;
  secondLastName: string;
  age: number;
  height: number;
  planId: number;
  email: string;
  phoneNumber: string;
  weight: number;
  fatperc: number;
  IMC: number;
}
