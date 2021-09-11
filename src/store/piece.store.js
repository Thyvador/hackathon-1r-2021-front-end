class PieceStore {
  piece = null;
  pieceUri = null;

  constructor() {
    const piece = localStorage.getItem("piece");
    if (piece) {
      this.setActivePiece(JSON.parse(piece));
    }
  }

  setActivePiece(piece) {
    this.pieceUri = piece.id;
    this.piece = piece;
    localStorage.setItem("piece", JSON.stringify(piece));
  }

  getId() {
    if (!this.piece) {
      return null;
    }
    const split = this.piece.id.split("/");
    return split[split.length - 1];
  }

  getCompany() {
    if (!this.piece) {
      return null;
    }
    const split = this.piece.companyIdentifier.split("/");
    return split[split.length - 1];
  }

  getPiece() {
    return this.piece;
  }
}

export default new PieceStore();
