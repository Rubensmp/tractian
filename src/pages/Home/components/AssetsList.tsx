import React from "react"

import { colors } from "../../../styles/colors"
import { AiOutlineSearch } from "react-icons/ai"
import MainTree from "../../../components/MainTree"
import {
  AssetTreeType,
  LocationTreeType,
  TreeNodeType,
} from "../../../types/assetsTree"
import Loader from "../../../components/Loader"

interface AssetsListProps {
  searchTerm: string
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  locations?: LocationTreeType[]
  assets?: AssetTreeType[]
  statusTerm: string
  sensorType: string
  setComponent: (data: TreeNodeType) => void
  componentId?: string
  isLoading?: boolean
}

export const AssetsList = ({
  searchTerm,
  handleSearchChange,
  locations,
  assets,
  statusTerm,
  sensorType,
  setComponent,
  componentId,
  isLoading,
}: AssetsListProps) => {
  return (
    <div className="border-[1px] border-gray-200 rounded-[2px] lg:min-w-[480px]">
      {isLoading ? (
        <Loader className="p-[24px]" />
      ) : (
        <>
          <div className="flex items-center justify-between pr-[12px] border-b-[1px] border-gray-200">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar Ativo ou Local"
              className="flex flex-1 px-[12px] py-[4px] focus:outline-none text-sm"
            />
            <AiOutlineSearch color={colors["gray-800"]} />
          </div>
          <div className="px-[4px] py-[8px] ">
            {locations && assets && (
              <MainTree
                locations={locations}
                assets={assets}
                searchTerm={searchTerm}
                status={statusTerm}
                sensorType={sensorType}
                setComponent={setComponent}
                selected={componentId}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
