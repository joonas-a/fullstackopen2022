import axios from 'axios';
import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};
