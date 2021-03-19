import ShoppingRepository from "../../ports/repositories/Shopping.repository";

export default class DeleteByIdUseCase {
  constructor(private shoppingRepository: ShoppingRepository) {}

  async execute(id: any, pseudo: any): Promise<string> {
    return await this.shoppingRepository.deleteById(id, pseudo);
  }
}
