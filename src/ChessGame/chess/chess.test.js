import { indexToAlgebraic, lookupPieceToRender } from "./chess";

describe("indexToAlgebraic", () => {
  it("should convert 0 to a8", () => {
    const result = indexToAlgebraic(0)
    expect(result).toEqual("a8");
  });
  it("should convert 63 to h1", () => {
    const result = indexToAlgebraic(63)
    expect(result).toEqual("h1");
  });
  it("should convert 56 to a1", () => {
    const result = indexToAlgebraic(56)
    expect(result).toEqual("a1");
  });
  it("should convert 45 to a1", () => {
    const result = indexToAlgebraic(45)
    expect(result).toEqual("f3");
  });
});

describe("lookupPieceToRender", () => {
  it("should return white rook", () => {
    const result = lookupPieceToRender({type: 'r', color: 'w'});
    expect(result).toEqual("♖");
  });
  it("should return black king", () => {
    const result = lookupPieceToRender({type: 'k', color: 'b'});
    expect(result).toEqual("♚");
  });
  it("should return white pawn", () => {
    const result = lookupPieceToRender({type: 'p', color: 'w'});
    expect(result).toEqual("♙");
  });
  it("should return black pawn", () => {
    const result = lookupPieceToRender({type: 'p', color: 'b'});
    expect(result).toEqual("♟");
  });
});
