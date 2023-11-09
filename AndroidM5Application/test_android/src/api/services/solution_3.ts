import { request } from './base';
import { apiUrl } from '../paths';

const createDataToRelaySolution3 = (params: any) => {
    return request(apiUrl.solution_3, 'post', params);
}

export default {
    createDataToRelaySolution3,
};
