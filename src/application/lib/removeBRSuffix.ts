export function removeBrSuffix(storeName: string): string {
  return storeName.replace(/ BR$| br$/i, '');
}