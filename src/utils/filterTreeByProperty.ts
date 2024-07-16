import { SearchProperty, TreeNodeType } from "../types/assetsTree"

export const filterTreeByProperty = (
  tree: TreeNodeType[],
  searchTerm: string,
  property: SearchProperty
): TreeNodeType[] => {
  const filterNode = (node: TreeNodeType): TreeNodeType | null => {
    const nodeProperty = node[property]
    const matches =
      typeof nodeProperty === "string" &&
      nodeProperty.toLowerCase().includes(searchTerm.toLowerCase())

    let filteredChildren: TreeNodeType[] = []

    if (node.children) {
      filteredChildren = node.children
        .map((child) => filterNode(child))
        .filter((child) => child !== null) as TreeNodeType[]
    }

    if (matches || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren,
      }
    }

    return null
  }

  return tree
    .map((node) => filterNode(node))
    .filter((node) => node !== null) as TreeNodeType[]
}
