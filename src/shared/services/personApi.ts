import { enviroment } from "../environments";
import { instance } from "./config";

export interface IListPerson {
  id: number;
  email: string;
  fullName: string;
  cityId: number;
}

type TPersonTotalCount = {
  data: IListPerson[];
  totalCount: number;
}

export async function getAll(page: number, filter: string): Promise<TPersonTotalCount | Error> {
  const relativeUrl = `/people?_page=${page}&_limit=${enviroment.LINE_LIMIT}&fullName_like=${filter}`;
  
  try {
    const { data, headers } = await instance.get(relativeUrl);

    if(data) {
      return {
        data,
        totalCount: Number(headers['x-total-count']) || enviroment.LINE_LIMIT,
      }
    }
    return new Error('Erro ao listar os registros.');
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao listar os registros.');
  } 
}

export async function getById(id: number): Promise<IListPerson | Error> {
  try {
    const { data } = await instance.get(`person/${id}`);
    
    if(data) {
      return data;
    }
    return new Error('Erro ao buscar este registro.');
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao buscar este registro.');
  }
  
}

export async function create(body: Omit<IListPerson, 'id'>): Promise<number | Error> {
  try {
    const { data } = await instance.post<IListPerson>('/person', body);

    if(data) {
      return data.id;
    }
    
    return new Error('Erro ao criar o registro.');
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao criar o registro.');
  }
}

export async function updateById(id: number, body: IListPerson): Promise<void | Error> {
  try {
    await instance.put(`/person/${id}`, body);

  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao atualizar o registro.');
  }
}

export async function deleteById(id: number): Promise<void | Error> {
  try {
    await instance.delete(`/person/${id}`);

  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao deletar o registro.');
  }
}


export const PeopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
