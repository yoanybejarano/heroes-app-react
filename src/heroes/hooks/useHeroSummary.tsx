import {getSummaryAction} from "@/heroes/actions/get-summary.action.ts";
import {useQuery} from "@tanstack/react-query";

export const useHeroSummary = () => {
    return  useQuery({
        queryKey: ['summary-information'],
        queryFn: getSummaryAction,
        staleTime: 1000 * 60 * 5,
    });
};