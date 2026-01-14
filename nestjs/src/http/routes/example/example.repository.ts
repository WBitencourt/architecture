export interface Example {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FindExampleByEmailParams {
  email: string;
}

export interface CreateExampleParams {
  name: string;
  email: string;
}

export interface DeleteExampleParams {
  id: string;
}

export interface UpdateExampleParams {
  id: string;
  data: {
    name: string;
  };
}

export interface FindExampleByIdParams {
  id: string;
}
