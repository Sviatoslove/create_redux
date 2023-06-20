import httpService from './http.service';
import { generateTitle } from '../utils/generateTitle';

const todosEndpoint = 'todos/';

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
    return data;
  },
  create: async () => {
    const { data } = await httpService.post(todosEndpoint);
    return { ...data, title: generateTitle.getTitle(), completed: false };
  },
};

export default todosService;
