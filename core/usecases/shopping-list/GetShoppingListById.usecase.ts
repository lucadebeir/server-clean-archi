import Shopping from "../../domain/Shopping";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";

export default class GetShoppingListByIdUseCase {
  constructor(private shoppingRepository: ShoppingRepository) {}

  async execute(pseudo: any): Promise<Shopping[]> {
    return await this.shoppingRepository.findById(pseudo);
  }
}
