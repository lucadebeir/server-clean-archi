import IllustrateCommentaireDomain from "../../domain/IllustrateCommentaire.domain";

export default interface IllustrateCommentaireRepository {
  addToCommentaire(
    illustrateCommentaire: IllustrateCommentaireDomain
  ): Promise<string>;
  updateFromCommentaire(
    illustrateCommentaire: IllustrateCommentaireDomain
  ): Promise<string>;

  check(illustrateCommentaire: IllustrateCommentaireDomain): Promise<boolean>;
}
