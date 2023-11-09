import { request } from './base';
import { apiUrl } from '../paths';

const createDataToRelaySubdivision3 = (params: any) => {
    return request(apiUrl.subdivision_3, 'post', params);
}

export default {
    createDataToRelaySubdivision3,
};
