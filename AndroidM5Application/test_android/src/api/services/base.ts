import axios from 'axios';

export const request = async (
    url: any,
    method: any,
    params?: any,
    contentType = 'application/json',
) => {
    let header = {
        Accept: 'application/json',
        'Content-Type': contentType,
        'X-AIO-KEY': 'aio_rctQ44tIQlubyfnpLYr68iav0PB8',
    };

    const config = {
        headers: header,
        method: method,
        url: url,
        params: undefined,
        data: undefined,
    };

    if (__DEV__) {
        console.log('config', config);
    }
    if (method.toLowerCase() === 'get') {
        config.params = params ?? undefined;
    } else {
        config.data = params ? params : undefined;
    }

    return new Promise(resolve => {
        axios(config)
            .then(res => {
                if (__DEV__) {
                    console.log('RESPONSE', { ...config, response: res.data });
                }
                resolve({ data: res.data });
            })
            .catch(err => {
                if (__DEV__) {
                    console.log('error', { ...config, ...err.response });
                }
                resolve({ error: err.response.data });
                return;
            });
    });
};
