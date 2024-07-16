import { AssetType } from "../types/assets"
import { AssetTreeType, LocationTreeType } from "../types/assetsTree"
import { LocationType } from "../types/location"

export const buildTree = (
  locations: LocationType[],
  assets: AssetType[]
): (LocationTreeType | AssetTreeType)[] => {
  const locationMap: { [key: string]: LocationTreeType } = {}
  const assetMap: { [key: string]: AssetTreeType } = {}

  locations.forEach((location) => {
    locationMap[location.id] = { ...location, children: [] }
  })

  assets.forEach((asset) => {
    assetMap[asset.id] = { ...asset, children: [] }
  })

  const roots: (LocationTreeType | AssetTreeType)[] = []

  locations.forEach((location) => {
    if (location.parentId === null) {
      roots.push(locationMap[location.id])
    } else {
      const parent = locationMap[location.parentId]
      if (parent) {
        parent.children!.push(locationMap[location.id])
      }
    }
  })

  assets.forEach((asset) => {
    if (asset.parentId === null && !asset.locationId) {
      roots.push(assetMap[asset.id])
    } else {
      const parent = asset.locationId
        ? locationMap[asset.locationId]
        : assetMap[asset.parentId!]
      if (parent) {
        parent.children!.push(assetMap[asset.id])
      }
    }
  })
  return roots
}
