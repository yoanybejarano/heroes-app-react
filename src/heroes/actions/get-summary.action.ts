import {heroApi} from "@/heroes/api/hero.api.ts";
import type {SummaryInformation} from "@/heroes/interfaces/summary-information.response.ts";


export const getSummaryAction = async (): Promise<SummaryInformation> => {
    const {data} = await heroApi.get<SummaryInformation>(`/summary`);
    return data;
}