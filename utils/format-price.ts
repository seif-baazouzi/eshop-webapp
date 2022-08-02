export default function formatPrice(price: number): string {      
  const priceString = price.toString()
  const priceValue = priceString.substring(0, priceString.length-2)
  const priceFraction = priceString.substring(priceString.length-2)

  return `${priceValue || "0"}.${priceFraction}`
}
