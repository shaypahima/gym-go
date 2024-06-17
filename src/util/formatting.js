export default function formatPrice(price){
  return Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(price)
}