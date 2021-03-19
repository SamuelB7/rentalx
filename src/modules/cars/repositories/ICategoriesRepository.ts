import { Category } from "../models/Category";


interface ICategoriesRepository {
    findByName(name: string): Category
    list(): Category[]
    create(name: string, description: string): void
}

//DTO => Data transfer object
interface ICreateCategoryDTO {
    name: string
    description: string
}

export { ICategoriesRepository, ICreateCategoryDTO }