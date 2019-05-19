import React from 'react';
import whiteKing from './resources/w-king.svg'; // Tell Webpack this JS file uses this image
import whiteQueen from './resources/w-queen.svg'
import whiteRook from './resources/w-rook.svg'
import whiteKnight from './resources/w-knight.svg'
import whiteBishop from './resources/w-bishop.svg'
import whitePawn from './resources/w-pawn.svg'
import blackKing from './resources/b-king.svg'
import blackQueen from './resources/b-queen.svg'
import blackRook from './resources/b-rook.svg'
import blackPawn from './resources/b-pawn.svg'
import blackBishop from './resources/b-bishop.svg'
import blackKnight from './resources/b-knight.svg'

const typesMap = {
  w: {
    p: whitePawn,
    k: whiteKing,
    q: whiteQueen,
    r: whiteRook,
    n: whiteKnight,
    b: whiteBishop,
  },
  b: {
    p: blackPawn,
    k: blackKing,
    q: blackQueen,
    r: blackRook,
    n: blackKnight,
    b: blackBishop,
  }
}

export default function Piece(props) {
  if (!props) {
    return null;
  }
  return <img class="piece" src={typesMap[props.color][props.type]} alt="king" />;
}

