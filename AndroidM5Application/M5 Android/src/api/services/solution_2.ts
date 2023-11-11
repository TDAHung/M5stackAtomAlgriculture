import { request } from './base';
import { apiUrl } from '../paths';

const createDataToRelaySolution2 = (params: any) => {
    return request(apiUrl.solution_2, 'post', params);
}

export default {
    createDataToRelaySolution2,
};
