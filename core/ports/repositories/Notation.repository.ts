import NotationDomain from "../../domain/Notation.domain";

export default interface NotationRepository {
  save(notation: NotationDomain): Promise<NotationDomain>;
  findByPseudo(idRecipe: number, pseudo: string): Promise<NotationDomain>;
}
