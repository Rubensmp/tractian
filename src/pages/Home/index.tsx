import React, { useEffect, useState } from "react"
import { useCompaniesData } from "../../hooks/useCompaniesData"
import { useLocationsData } from "../../hooks/useLocationsData"
import { useAssetsData } from "../../hooks/useAssetsData"
import { CompanyType } from "../../types/company"
import ToggleButton from "../../components/ToggleButton"
import {
  AiOutlineExclamationCircle,
  AiOutlineThunderbolt,
} from "react-icons/ai"

import { colors } from "../../styles/colors"
import AssetDetails from "./components/AssetDetails"
import { TreeNodeType } from "../../types/assetsTree"
import Header from "../../components/Header"
import { AssetsList } from "./components/AssetsList"

export default function Home() {
  const [company, setCompany] = useState<CompanyType | undefined>(undefined)
  const [component, setComponent] = useState<TreeNodeType>()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusTerm, setStatusTerm] = useState("")
  const [sensorType, setSensorType] = useState("")

  const companies = useCompaniesData()
  const locations = useLocationsData(company?.id)
  const assets = useAssetsData(company?.id)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    setComponent(undefined)
    setSearchTerm("")
    setStatusTerm("")
    setSensorType("")
  }, [company])

  return (
    <div className="flex flex-col h-screen">
      <Header
        data={companies.data}
        setCompany={setCompany}
        company={company}
        isLoading={companies.isLoading}
      />
      <div className="flex flex-1 bg-gray-150 p-[8px]">
        <div className="flex flex-1 flex-col gap-[12px] p-[16px] bg-white border-[1px] border-gray-200 rounded-[4px]">
          {company ? (
            <>
              <div className="flex flex-col gap-[5px] justify-between sm:flex-row ">
                <div className="text-xl font-bold">
                  Ativos{" "}
                  <span className=" text-gray-600 text-sm font-normal">
                    / {company?.name}
                  </span>
                </div>

                <div className="flex gap-[8px]">
                  <ToggleButton
                    onClick={() =>
                      setSensorType(sensorType === "energy" ? "" : "energy")
                    }
                    isActive={sensorType === "energy"}
                    text="Sensor de Energia"
                    icon={
                      <AiOutlineThunderbolt
                        color={
                          sensorType === "energy"
                            ? colors.white
                            : colors["blue-500"]
                        }
                      />
                    }
                    size="sm"
                  />

                  <ToggleButton
                    onClick={() =>
                      setStatusTerm(statusTerm === "alert" ? "" : "alert")
                    }
                    isActive={statusTerm === "alert"}
                    text="Crítico"
                    icon={
                      <AiOutlineExclamationCircle
                        color={
                          statusTerm === "alert"
                            ? colors.white
                            : colors["blue-500"]
                        }
                      />
                    }
                    size="sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[8px] lg:flex-row lg:flex-1">
                <AssetsList
                  assets={assets.data}
                  handleSearchChange={handleSearchChange}
                  locations={locations.data}
                  searchTerm={searchTerm}
                  sensorType={sensorType}
                  setComponent={setComponent}
                  statusTerm={statusTerm}
                  componentId={component?.id}
                  isLoading={locations.isLoading || assets.isLoading}
                />
                <AssetDetails data={component} />
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center flex-col gap-[5px] justify-center">
              <div className="text-gray-950 text-2xl">Bem vindo!</div>
              <div className="text-gray-700 text-xl font-medium">
                Selecione uma empresa acima
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
