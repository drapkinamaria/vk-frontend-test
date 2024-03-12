import { GetGroupsResponse, Group } from '../src/types';
import axios from 'axios';
import { API_BASE_URL } from '../src/config/config';

export const fetchData = async (index: number): Promise<Group[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await axios.get(`${API_BASE_URL}/${index}`);
    const data: GetGroupsResponse = response.data;
    data.result = 1;
    data.data = response.data;

    if (data.data && data.result === 1) {
      return data.data;
    } else {
      console.error(`Data fetch error for index ${index}:`, data);
      return [];
    }
  } catch (error) {
    console.error(`Data request error for index ${index}:`, error);
    return [];
  }
};
