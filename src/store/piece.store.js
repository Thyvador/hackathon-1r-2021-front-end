class PieceStore {
  piece = null;
  pieceUri = null;

  setActivePieceUri(piece) {
    this.pieceUri = piece.id;
    this.piece = piece;
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
}

export default new PieceStore();
