import { useState } from "react"

import { colors } from "../styles/colors"
import { TreeNodeType } from "../types/assetsTree"

import { AiOutlineCodepen, AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import { MdBolt, MdOutlineLocationOn } from "react-icons/md"
import { IoCubeOutline } from "react-icons/io5"
import { TbPointFilled } from "react-icons/tb"

interface Props {
  data: TreeNodeType
  setComponent: any
  selected: string
}

export default function TreeNode({ data, setComponent, selected }: Props) {
  const [expanded, setExpanded] = useState(false)

  const handleToggle = () => {
    if (data.children && data.children?.length > 0) setExpanded(!expanded)
    setComponent(data)
  }

  const isSelected = selected === data.id
  const typeIconColor = isSelected ? colors.white : colors["blue-500"]

  const handleItemTypeIcon = () => {
    if (!!data.sensorType)
      return (
        <AiOutlineCodepen
          size={22}
          className="flex-shrink-0"
          color={typeIconColor}
        />
      )
    if (!!data.locationId && !!!data.sensorId)
      return (
        <IoCubeOutline
          size={22}
          className="flex-shrink-0"
          color={typeIconColor}
        />
      )
    if (!!data.parentId && !!!data.sensorId)
      return (
        <MdOutlineLocationOn
          size={22}
          className="flex-shrink-0"
          color={typeIconColor}
        />
      )

    return (
      <MdOutlineLocationOn
        size={22}
        className="flex-shrink-0"
        color={typeIconColor}
      />
    )
  }

  const handleChevron = () => {
    if (data.children && data.children?.length > 0) {
      return expanded ? (
        <div className="h-[22px] w-[22px] flex justify-center items-center">
          <AiOutlineUp
            size={12}
            className="flex-shrink-0"
            color={colors["blue-header"]}
          />
        </div>
      ) : (
        <div className="h-[22px] w-[22px] flex justify-center items-center">
          <AiOutlineDown
            size={12}
            className="flex-shrink-0"
            color={colors["blue-header"]}
          />
        </div>
      )
    }
  }

  const handleSensorIcon = () => {
    const iconColor = data.status === "alert" ? colors.red : colors.green
    const iconType =
      data.sensorType === "energy" ? (
        <MdBolt color={iconColor} className="flex-shrink-0" />
      ) : (
        <TbPointFilled color={iconColor} className="flex-shrink-0" />
      )

    return (data.status || data.sensorType) && iconType
  }

  return (
    <div className="flex flex-col gap-[4px]">
      <div
        className={`flex items-center cursor-pointer ${
          isSelected && "bg-blue-500"
        }`}
        onClick={handleToggle}
      >
        {handleChevron()}
        {handleItemTypeIcon()}
        <div className={`px-[4px] text-sm ${isSelected && "text-white"}`}>
          {data.name}
        </div>
        {handleSensorIcon()}
      </div>
      <div className="flex flex-col">
        {data.children && expanded && (
          <div className="ml-[20px]">
            {data.children.map((child) => (
              <TreeNode
                key={child.id}
                data={child}
                setComponent={setComponent}
                selected={selected}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
