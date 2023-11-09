import { request } from './base';
import { apiUrl } from '../paths';

const createDataToRelayPumpIn = (params: any) => {
    return request(apiUrl.pump_in, 'post', params);
}

export default {
    createDataToRelayPumpIn,
};
