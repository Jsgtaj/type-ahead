export function numberWithCommas(x) {
  return new Intl.NumberFormat().format(x);
}
