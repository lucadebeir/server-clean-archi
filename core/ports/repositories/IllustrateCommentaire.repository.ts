import IllustrateCommentaire from "../../domain/IllustrateCommentaire";

export default interface IllustrateCommentaireRepository {
  addToCommentaire(
    illustrateCommentaire: IllustrateCommentaire
  ): Promise<string>;
  updateFromCommentaire(
    illustrateCommentaire: IllustrateCommentaire
  ): Promise<string>;

  check(illustrateCommentaire: IllustrateCommentaire): Promise<boolean>;
}
