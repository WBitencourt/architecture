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

export abstract class ExampleRepository {
  abstract create(params: CreateExampleParams): Promise<Example>;
  abstract findAll(): Promise<Example[]>;
  abstract findById(params: FindExampleByIdParams): Promise<Example | null>;
  abstract findByEmail(
    params: FindExampleByEmailParams,
  ): Promise<Example | null>;
  abstract update(params: UpdateExampleParams): Promise<Example>;
  abstract deleteById(params: DeleteExampleParams): Promise<Example>;
}
