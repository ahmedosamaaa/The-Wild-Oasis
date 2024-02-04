import { useQuery } from "@tanstack/react-query";
import { getCapins } from "../../services/apiCabins";

export function useCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCapins,
  });

  return { isLoading, cabins };
}
