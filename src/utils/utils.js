export const ArrayisObject = (arr, itemKey, itemVal) => {
  const isItem = arr.filter((item, index) => {
    if (item[itemKey] == itemVal) {
      return true;
    } else {
      return false;
    }
  })
  return isItem.length >= 1;
}