import axios from '../utils/axiosHelper';
import { TodoPayload, ToDoRecordType, EditToDoPayload } from '../types/todoTypes';


export const getTodoList = async (): Promise<ToDoRecordType[]> => {
    try {
        const response = await axios.get('/todos');
        return response.data || [];
    } catch (error) {
        console.log('error', error);
        return [];
    }
};

export const createTodo = async (data: TodoPayload): Promise<ToDoRecordType | undefined> => {
  try {
    const response = await axios.post(`/todos/`, { data });
    return response.data;
  } catch (error) {
    console.log('error', error);
    return;
  }
};

export const editTodo = async (id: string | undefined, data: EditToDoPayload): Promise<ToDoRecordType | undefined> => {
  try {
    const response = await axios.put(`/todos/${id}`, { data });
    return response.data;
  } catch (error) {
    console.log('error', error);
    return;
  }
};

export const deleteTodoService = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/todos/${id}`);
    return;
  } catch (error) {
    console.log('error', error);
    return;
  }
};