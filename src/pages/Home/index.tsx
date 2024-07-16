import React, { useState } from "react"
import logo from "../../assets/logo.png"
import { useCompaniesData } from "../../hooks/useCompaniesData"
import { useLocationsData } from "../../hooks/useLocationsData"
import { useAssetsData } from "../../hooks/useAssetsData"
import { CompanyType } from "../../types/company"
import MainTree from "../../components/MainTree"
import ToggleButton from "../../components/ToggleButton"

export default function Home() {
  const [companyId, setCompanyId] = useState<string | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusTerm, setStatusTerm] = useState("")
  const [sensorType, setSensorType] = useState("")

  const companies = useCompaniesData()
  const locations = useLocationsData(companyId)
  const assets = useAssetsData(companyId)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="bg-blue-1">
      <img src={logo} alt="logo" className="object-contain" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by asset or location..."
      />

      <ToggleButton
        onClick={() => setStatusTerm(statusTerm === "alert" ? "" : "alert")}
        isActive={statusTerm === "alert"}
        text="Crítico"
      />

      <ToggleButton
        onClick={() => setSensorType(sensorType === "energy" ? "" : "energy")}
        isActive={sensorType === "energy"}
        text="Sensor de Energia"
      />

      {companies.data?.map((item: CompanyType) => (
        <div
          key={item.id}
          onClick={() => {
            setCompanyId(item.id)
          }}
        >
          {item.name}
        </div>
      ))}

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
  )
}
