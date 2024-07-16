import { useQuery } from "@tanstack/react-query"
import api from "../services/config"
import { LocationType } from "../types/location"

async function fetchLocations(id: string | undefined): Promise<LocationType[]> {
  const response = await api.get<LocationType[]>(`/companies/${id}/locations`)
  return response.data
}

export function useLocationsData(id: string | undefined) {
  const query = useQuery({
    queryFn: () => fetchLocations(id),
    queryKey: ["locations", id],
    enabled: !!id,
  })

  return { ...query, data: query.data }
}
