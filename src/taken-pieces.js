import React from 'react';
import { lookupPieceToRender } from './chess/chess'

export default function TakenPieces(props) {
  const takenWhitePieces = props.takenPieces.filter(takenPiece => {
    return takenPiece.color === 'w'
  });
  const displayTakenWhitePieces = takenWhitePieces.map(takenWhitePiece => {
    return lookupPieceToRender(takenWhitePiece);
  });
  const takenBlackPieces = props.takenPieces.filter(takenPiece => {
    return takenPiece.color === 'b'
  });
  const displayTakenBlackPieces = takenBlackPieces.map(takenWhitePiece => {
    return lookupPieceToRender(takenWhitePiece);
  });
  return (
    <div>
      <div>
        {displayTakenBlackPieces}
      </div>
      <div>
        {displayTakenWhitePieces}
      </div>
    </div>
  )
}