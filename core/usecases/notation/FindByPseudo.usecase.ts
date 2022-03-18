import Notation from "../../domain/Notation";
import NotationRepository from "../../ports/repositories/Notation.repository";

export default class FindByPseudoUseCase {
  constructor(private notationRepository: NotationRepository) {}

  async execute(id_recipe: any, pseudo: string): Promise<Notation> {
    let res: Notation = await this.notationRepository.findByPseudo(id_recipe, pseudo);
    if(!res) {
      res = new Notation();
      res.pseudo = pseudo;
      res.id_recipe = id_recipe;
      res.note = 0;
    }
    return res;
  }
}
