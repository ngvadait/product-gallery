export const numberFormat = (num) => {
  return (num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}
