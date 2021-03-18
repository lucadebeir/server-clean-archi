import Category from "../../domain/Category";
import CategoryRepository from "../../ports/repositories/Category.repository";
import CreateCategoryUseCase from "../../usecases/category/CreateCategory.usecase";

const initCategory = (): Category => {
    
    const category = new Category();
    category.libelleCategorie = "Douceur";

    return category;
}

describe('Create category use case unit tests', () => {

    let createCategoryUseCase: CreateCategoryUseCase;

    let category: Category;

    let categoryRepository: CategoryRepository = { create: null } as unknown as CategoryRepository;

    beforeEach(() => {

        category = initCategory();

        createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

        spyOn(categoryRepository, 'create').and.callFake((category: Category) => {
            if(category) {
                const result: Category = { ...category, idCategorie: 1}
                return new Promise((resolve, reject) => resolve(result));
            }
            return new Promise((resolve, reject) => resolve(null));
        })

        /*it('createCategoryUseCase should throw a parameter exception when the category is null', async () => {
            try {
                await createCategoryUseCase.execute(null);
            } catch (e) {

            }
        })*/

    })

    it('createCategoryUseCase should return category when it succeeded', async () => {
        const result: Category = await createCategoryUseCase.execute(category);
        expect(result).toBeDefined();
        expect(result.idCategorie).toBe(1);
        expect(result.libelleCategorie).toBe('Douceur');
    })

})