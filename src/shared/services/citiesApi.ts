import { enviroment } from "../environments";
import { instance } from "./config";

export interface IListCity {
  id: number;
  name: string;
  state: string;
}

type TCityTotalCount = {
  data: IListCity[];
  totalCount: number;
}

export async function getAll(page: number, filter: string): Promise<TCityTotalCount | Error> {
  const relativeUrl = `/city?_page=${page}&_limit=${enviroment.LINE_LIMIT}&name_like=${filter}`;
  
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

export async function getById(id: number): Promise<IListCity | Error> {
  try {
    const { data } = await instance.get(`city/${id}`);
    
    if(data) {
      return data;
    }
    return new Error('Erro ao buscar este registro.');
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao buscar este registro.');
  }
  
}

export async function create(body: Omit<IListCity, 'id'>): Promise<number | Error> {
  try {
    const { data } = await instance.post<IListCity>('/city', body);

    if(data) {
      return data.id;
    }
    
    return new Error('Erro ao criar o registro.');
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao criar o registro.');
  }
}

export async function updateById(id: number, body: IListCity): Promise<void | Error> {
  try {
    await instance.put(`city/${id}`, body);

  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao atualizar o registro.');
  }
}

export async function deleteById(id: number): Promise<void | Error> {
  try {
    await instance.delete(`city/${id}`);

  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao deletar o registro.');
  }
}


export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
