import Notation from "../../domain/Notation";

export default interface NotationRepository {
  save(notation: Notation): Promise<Notation>;
  findByPseudo(idRecipe: number, pseudo: string): Promise<Notation>;
}
