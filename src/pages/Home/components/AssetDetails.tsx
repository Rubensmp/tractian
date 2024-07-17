import React from "react"
import { TreeNodeType } from "../../../types/assetsTree"
import { SensorIcon } from "./SensorIcon"
import { AiOutlineInbox } from "react-icons/ai"
import { colors } from "../../../styles/colors"
import { MdOutlineRouter, MdWifiTethering } from "react-icons/md"

interface AssetDetailsProps {
  data?: TreeNodeType
}

export default function AssetDetails({ data }: AssetDetailsProps) {
  const accountable = data?.sensorType === "vibration" ? "Mecânica" : "Elétrica"

  const accountableLetter = data?.sensorType === "vibration" ? "M" : "E"

  const showDetails = !!data?.sensorId || !!data?.gatewayId

  return (
    <div className="flex flex-col flex-1 border-[1px] border-gray-200 rounded-[2px]">
      {data ? (
        <>
          <div
            className={`flex items-center gap-[8px] px-[16px] py-[12px] ${
              showDetails && "border-b-[1px]"
            } border-gray-200`}
          >
            <div className="font-semibold text-lg">{data?.name}</div>
            <SensorIcon data={data} />
          </div>
          {showDetails && (
            <div className="flex flex-col gap-[24px] p-[24px]">
              <div className="flex flex-1 flex-col gap-[24px] lg:flex-row lg:items-center border-b-[1px] border-gray-200 lg:pb-[24px]">
                <div
                  onClick={() => alert("Sem implementação.")}
                  className="box-content h-[226px] bg-blue-50 border-dashed rounded-[4px] border-[2px] border-blue-400 flex gap-[5px] flex-col items-center justify-center sm:w-[336px] cursor-pointer"
                >
                  <AiOutlineInbox size={42} color={colors["blue-400"]} />
                  <div className="text-sm text-blue-500 font-medium">
                    Adicionar imagem do Ativo
                  </div>
                </div>
                <div className="flex flex-col gap-[24px] flex-1">
                  <div className="flex flex-col gap-[4px] border-b-[1px] border-gray-200 pb-[24px]">
                    <div className="text-md font-semibold text-gray-950">
                      Tipo de equipamento
                    </div>
                    <div className="text-md font-normal text-gray-500">
                      Motor Elétrico (Trifásico)
                    </div>
                  </div>
                  <div className="flex flex-col gap-[4px] pb-[24px]">
                    <div className="text-md font-semibold text-gray-950">
                      Responsáveis
                    </div>
                    <div className="flex gap-[8px]">
                      <div className="flex text-sm text-white w-[24px] h-[24px] rounded-full bg-blue-500 items-center justify-center">
                        {accountableLetter}
                      </div>
                      <div className="text-md font-normal text-gray-500">
                        {accountable}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-[24px] lg:flex-row ">
                <div className="flex flex-col gap-[4px] lg:flex-1">
                  <div className="text-md font-semibold text-gray-950">
                    Sensor
                  </div>
                  <div className="flex flex-row items-center gap-[8px]">
                    <MdWifiTethering color={colors["blue-500"]} size={25} />
                    <div className="text-md font-normal text-gray-500">
                      {data?.sensorId}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[4px] lg:flex-1">
                  <div className="text-md font-semibold text-gray-950">
                    Receptor
                  </div>
                  <div className="flex flex-row items-center gap-[8px]">
                    <MdOutlineRouter color={colors["blue-500"]} size={25} />
                    <div className="text-md font-normal text-gray-500">
                      {data?.gatewayId}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-1  justify-center p-[24px]">
          <div className="text-gray-700 text-xl font-medium">
            Selecione um item na lista de assets
          </div>
        </div>
      )}
    </div>
  )
}
