export default function radius(mid, extent) {
  const head = [];
  const tail = [];
  for (let i = 0; i < extent; i++) {
    head.unshift(mid - (i + 1));
    tail.push(mid + (i + 1));
  }
  const result = [mid];
  result.unshift(...head);
  result.push(...tail);
  return result;
}
