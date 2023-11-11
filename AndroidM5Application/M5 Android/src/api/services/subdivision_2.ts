import { request } from './base';
import { apiUrl } from '../paths';

const createDataToRelaySubdivision2 = (params: any) => {
    return request(apiUrl.subdivision_2, 'post', params);
}

export default {
    createDataToRelaySubdivision2,
};
