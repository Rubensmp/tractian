import React, { ReactNode } from "react"

interface ToggleButtonProps {
  isActive: boolean
  onClick: () => void
  text: string
  icon?: ReactNode
  size: "xs" | "sm"
}
export default function ToggleButton({
  isActive,
  onClick,
  text,
  icon = <></>,
  size = "xs",
}: ToggleButtonProps) {
  const commonStyles = "focus:outline-none flex items-center text-white"
  const xsStylesIsActive = isActive ? "bg-blue-500" : "bg-blue-900"
  const smStylesIsActive = isActive
    ? "bg-blue-500"
    : "bg-white border-[1px] border-gray-200"
  const xsStyles = "px-[8px] py-[4px] rounded-[2px] gap-[8px]"
  const smStyles = "px-[14px] py-[6px] rounded-[3px] gap-[6px]"
  const smTextIsActive = isActive ? "text-white" : "text-gray-600"
  const colorStyle = `${
    size === "sm" ? smTextIsActive : "text-white"
  } text-${size}`

  const typeStyles =
    size === "xs"
      ? `${xsStylesIsActive} ${xsStyles}`
      : `${smStylesIsActive} ${smStyles}`

  const styles = `${commonStyles} ${typeStyles}`

  return (
    <button className={styles} onClick={onClick}>
      {icon}
      <div className={colorStyle}>{text}</div>
    </button>
  )
}
