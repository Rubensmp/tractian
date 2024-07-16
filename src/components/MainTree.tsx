import { buildTree } from "../utils/buildTree"
import TreeNode from "./TreeNode"
import {
  AssetTreeType,
  LocationTreeType,
  SearchProperty,
  TreeNodeType,
} from "../types/assetsTree"
import { filterTreeByProperty } from "../utils/filterTreeByProperty"

interface TreeProps {
  locations: LocationTreeType[]
  assets: AssetTreeType[]
  searchTerm?: string
  status?: string
  sensorType?: string
  setComponent: any
  selected: string
}

export default function MainTree({
  locations,
  assets,
  searchTerm = "",
  status = "",
  sensorType = "",
  setComponent,
  selected,
}: TreeProps) {
  const roots = buildTree(locations, assets)
  const criteria: Array<{ property: SearchProperty; searchTerm: string }> = []

  if (searchTerm.trim() !== "") {
    criteria.push({ property: "name", searchTerm })
  }

  if (status !== "") {
    criteria.push({ property: "status", searchTerm: status })
  }

  if (sensorType !== "") {
    criteria.push({ property: "sensorType", searchTerm: sensorType })
  }

  let data = roots

  criteria.forEach((criterion) => {
    data = filterTreeByProperty(data, criterion.searchTerm, criterion.property)
  })

  if (data.length === 0) {
    return <div>No results found</div>
  }

  return (
    <>
      {data.map((root) => (
        <TreeNode
          key={root.id}
          data={root}
          setComponent={setComponent}
          selected={selected}
        />
      ))}
    </>
  )
}
