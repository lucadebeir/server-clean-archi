import Unity from "../../domain/Unity";
import UnityRepository from "../../ports/repositories/Unity.repository";

export default class GetUnityByIdUseCase {
  constructor(private unityRepository: UnityRepository) {}

  async execute(id: any): Promise<Unity> {
    return await this.unityRepository.findById(id);
  }
}
