import { request } from './base';
import { apiUrl } from '../paths';

const createDataToButton = (params: any) => {
    return request(apiUrl.button, 'post', params);
}

export default {
    createDataToButton,
};
