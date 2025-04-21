import api from './api';

export const postServices = (methodName, data) =>
{
    api.post(methodName, data).then((response) =>
    {
        return response.data;
    }).catch((err) =>
    {
        console.log(err);
        return err;
    });
}