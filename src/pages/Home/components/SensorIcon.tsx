import { MdBolt } from "react-icons/md"

import { TbPointFilled } from "react-icons/tb"
import { colors } from "../../../styles/colors"
import { TreeNodeType } from "../../../types/assetsTree"

interface SensorIconProps {
  data: TreeNodeType
}

export const SensorIcon = ({ data }: SensorIconProps) => {
  const iconColor = data.status === "alert" ? colors.red : colors.green
  const iconType =
    data.sensorType === "energy" ? (
      <MdBolt color={iconColor} className="flex-shrink-0" />
    ) : (
      <TbPointFilled color={iconColor} className="flex-shrink-0" />
    )
  if (data.status || data.sensorType) return iconType

  return <></>
}
