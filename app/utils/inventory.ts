export function addItemOnce<T extends { idItem: number }>(inventory: T[], item: T): T[] {
    return inventory.some((i) => i.idItem === item.idItem) ? inventory : [...inventory, item];
}
