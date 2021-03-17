import Unity from "../../domain/Unity";
import UnityRepository from "../../ports/repositories/Unity.repository";

export default class GetAllUnitiesUseCase {
  constructor(private unityRepository: UnityRepository) {}

  async execute(): Promise<Unity[]> {
    return await this.unityRepository.findAll();
  }
}
