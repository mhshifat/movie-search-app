export default function sleep(x: number) {
  return new Promise(res => setTimeout(() => res(x), x))
}