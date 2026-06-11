/** Plain ESM stub for @react-native/assets-registry in Storybook web builds. */
const assets = [];

export function registerAsset(asset) {
  return assets.push(asset);
}

export function getAssetByID(assetId) {
  return assets[assetId - 1];
}
