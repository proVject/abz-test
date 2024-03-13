export const randomString = () => {
  return BigInt(String(Math.random()).slice(3) + Date.now()).toString(32)
}