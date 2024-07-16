import { useQuery } from "@tanstack/react-query"
import api from "../services/config"
import { CompanyType } from "../types/company"

async function fetchCompanies(): Promise<CompanyType[]> {
  const response = await api.get<CompanyType[]>("/companies")
  return response.data
}

export function useCompaniesData() {
  const query = useQuery({
    queryFn: fetchCompanies,
    queryKey: ["companies"],
  })

  return { ...query, data: query.data }
}
