import Unity from "../../domain/Unity";
import UnityRepository from "../../ports/repositories/Unity.repository";

export default class CreateUnityUseCase {
  constructor(private unityRepository: UnityRepository) {}

  async execute(unity: Unity): Promise<Unity> {
    return await this.unityRepository.create(unity);
  }
}
