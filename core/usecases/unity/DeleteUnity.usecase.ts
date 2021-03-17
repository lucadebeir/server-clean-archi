import UnityRepository from "../../ports/repositories/Unity.repository";

export default class DeleteUnityUseCase {
  constructor(private unityRepository: UnityRepository) {}

  async execute(id: any): Promise<string> {
    return await this.unityRepository.deleteById(id);
  }
}
