import { request } from './base';
import { apiUrl } from '../paths';

const createDataToRelayPumpOut = (params: any) => {
    return request(apiUrl.pump_out, 'post', params);
}

export default {
    createDataToRelayPumpOut,
};
