import Unity from "../../domain/Unity";

export default interface UnityRepository {
    create(unity: Unity): Promise<Unity>;
    findAll(): Promise<Unity[]>;
    findById(id: any): Promise<Unity>;

    deleteById(id: any): Promise<string>;
    update(unity: Unity): Promise<Unity>;
}