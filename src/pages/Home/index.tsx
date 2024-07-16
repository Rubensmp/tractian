import React, { useState } from "react"
import logo from "../../assets/logo.png"
import { useCompaniesData } from "../../hooks/useCompaniesData"
import { useLocationsData } from "../../hooks/useLocationsData"
import { useAssetsData } from "../../hooks/useAssetsData"
import { CompanyType } from "../../types/company"
import MainTree from "../../components/MainTree"
import ToggleButton from "../../components/ToggleButton"
import {
  AiOutlineGold,
  AiOutlineExclamationCircle,
  AiOutlineThunderbolt,
  AiOutlineSearch,
} from "react-icons/ai"

import { colors } from "../../styles/colors"

export default function Home() {
  const [company, setCompany] = useState<CompanyType | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusTerm, setStatusTerm] = useState("")
  const [sensorType, setSensorType] = useState("")

  const companies = useCompaniesData()
  const locations = useLocationsData(company?.id)
  const assets = useAssetsData(company?.id)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <div className="flex flex-col gap-5 p-[16px] bg-blue-header justify-between items-center sm:flex-row">
        <img src={logo} alt="logo" className="object-contain w-[103px]" />
        <div className="flex gap-[10px]">
          {companies.data?.map((item: CompanyType) => (
            <ToggleButton
              key={item.id}
              onClick={() => setCompany(item)}
              isActive={item === company}
              text={item.name}
              icon={<AiOutlineGold />}
              size="xs"
            />
          ))}
        </div>
      </div>
      <div className="bg-gray-150 p-[8px] ">
        <div className="flex flex-col gap-[12px] p-[16px] bg-white border-[1px] border-gray-200 rounded-[4px]">
          <div className="flex flex-col gap-[5px] justify-between sm:flex-row">
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
                      statusTerm === "alert" ? colors.white : colors["blue-500"]
                    }
                  />
                }
                size="sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[8px] sm:flex-row">
            <div className="border-[1px] border-gray-200 rounded-[2px]">
              <div className="flex items-center justify-between pr-[12px] border-b-[1px] border-gray-200">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Buscar Ativo ou Local"
                  className="flex flex-1 px-[12px] py-[4px] focus:outline-none"
                />
                <AiOutlineSearch color={colors["gray-800"]} />
              </div>

              <div className="px-[4px] py-[8px]">
                {locations.data && assets.data && (
                  <MainTree
                    locations={locations.data}
                    assets={assets.data}
                    searchTerm={searchTerm}
                    status={statusTerm}
                    sensorType={sensorType}
                  />
                )}
              </div>
            </div>
            <div>
              {locations.data && assets.data && (
                <MainTree
                  locations={locations.data}
                  assets={assets.data}
                  searchTerm={searchTerm}
                  status={statusTerm}
                  sensorType={sensorType}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
