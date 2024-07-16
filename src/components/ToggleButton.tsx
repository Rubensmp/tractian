import React from "react"

interface ToggleButtonProps {
  isActive: boolean
  onClick: () => void
  text: string
}
export default function ToggleButton({
  isActive,
  onClick,
  text,
}: ToggleButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-md focus:outline-none 
        ${isActive ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
