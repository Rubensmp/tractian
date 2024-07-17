import React, { ReactNode } from "react"
import { CompanyType } from "../types/company"
import ToggleButton from "./ToggleButton"
import logo from "../assets/logo.png"
import { AiOutlineGold } from "react-icons/ai"

interface HeaderProps {
  data?: CompanyType[]
  setCompany: (data: CompanyType) => void
  company?: CompanyType
}
export default function Header({ data, setCompany, company }: HeaderProps) {
  return (
    <div className="flex flex-col gap-5 p-[16px] bg-blue-header justify-between items-center sm:flex-row">
      <img src={logo} alt="logo" className="object-contain w-[103px]" />
      <div className="flex gap-[10px]">
        {data?.map((item: CompanyType) => (
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
  )
}
