import { useState } from "react"
import { TreeNodeType } from "../types/assetsTree"

interface Props {
  data: TreeNodeType
}

export default function TreeNode({ data }: Props) {
  const [expanded, setExpanded] = useState(false)

  const handleToggle = () => {
    setExpanded(!expanded)
  }

  return (
    <div>
      <div
        style={{
          cursor: data.children ? "pointer" : "default",
        }}
        onClick={data.children ? handleToggle : undefined}
      >
        {data.name} [
        {data.sensorType ? `Component - ${data.sensorType}` : "Location/Asset"}]
      </div>
      {data.children && expanded && (
        <div style={{ marginLeft: "20px" }}>
          {data.children.map((child) => (
            <TreeNode key={child.id} data={child} />
          ))}
        </div>
      )}
    </div>
  )
}
