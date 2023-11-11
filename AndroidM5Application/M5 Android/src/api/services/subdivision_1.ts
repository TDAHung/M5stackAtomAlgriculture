import { request } from './base';
import { apiUrl } from '../paths';

const createDataToRelaySubdivision1 = (params: any) => {
    return request(apiUrl.subdivision_1, 'post', params);
}

export default {
    createDataToRelaySubdivision1,
};
