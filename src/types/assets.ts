export interface AssetType {
  id: string
  name: string
  locationId: string | null
  parentId: string | null
  sensorId?: string
  sensorType?: string
  status?: string
  gatewayId?: string
}
