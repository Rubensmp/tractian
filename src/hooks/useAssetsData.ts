import { useQuery } from "@tanstack/react-query"
import api from "../services/config"
import { AssetType } from "../types/assets"

async function fetchAssets(id: string | undefined): Promise<AssetType[]> {
  const response = await api.get<AssetType[]>(`/companies/${id}/assets`)
  return response.data
}

export function useAssetsData(id: string | undefined) {
  const query = useQuery({
    queryFn: () => fetchAssets(id),
    queryKey: ["assets", id],
    enabled: !!id,
  })

  return { ...query, data: query.data }
}
