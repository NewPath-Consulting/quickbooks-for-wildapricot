import wildApricotClient from "../../wildApricotClient.ts";
import endpoints from "../../endpoints.ts";
import {AxiosResponse} from "axios/index";


export const getTenders = async (accountId: string) => {
    return wildApricotClient.get(endpoints.wildApricotApi.getTenders.replace(':accountId', accountId))
}

