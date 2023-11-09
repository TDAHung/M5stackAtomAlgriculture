import { request } from './base';
import { apiUrl } from '../paths';

const createDataToRelaySolution1 = (params: any) => {
    return request(apiUrl.solution_1, 'post', params);
}

export default {
    createDataToRelaySolution1,
};
