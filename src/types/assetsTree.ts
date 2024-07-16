import { AssetType } from "./assets"
import { LocationType } from "./location"

export interface LocationTreeType extends LocationType {
  children?: (LocationTreeType | AssetTreeType)[]
}

export interface AssetTreeType extends AssetType {
  children?: AssetTreeType[]
}

export interface TreeNodeType {
  id: string
  name: string
  parentId: string | null
  locationId?: string | null
  sensorId?: string | null
  sensorType?: string | null
  status?: string | null
  gatewayId?: string | null
  children?: TreeNodeType[]
}

export type SearchProperty = "name" | "sensorType" | "status"
