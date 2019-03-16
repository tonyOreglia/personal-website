export function indexToAlgebraic(index) {
	const column = index % 8
  const row = 8 - Math.floor(index / 8)
  let algebraic;
	switch (column) {
    case 0:
      algebraic = "a"
      break;
    case 1:
      algebraic = "b"
      break;
    case 2:
      algebraic = "c"
      break;
    case 3:
      algebraic = "d"
      break;
    case 4:
      algebraic = "e"
      break;
    case 5:
      algebraic = "f"
      break;
    case 6:
      algebraic = "g"
      break;
    case 7:
      algebraic = "h"
      break;
    default:
      return ""
	}
	algebraic += row.toString()
	return algebraic
}