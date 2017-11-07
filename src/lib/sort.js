export function sortByField(list, field) {
  if (!list) {
    return list;
  }

  list = list.sort((a, b) => a[field] < b[field]);

  return list;
}