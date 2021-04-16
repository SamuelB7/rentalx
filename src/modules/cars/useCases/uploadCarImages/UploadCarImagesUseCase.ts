import { inject, injectable } from "tsyringe";
import { CarImage } from "../../infra/typeorm/entities/CarImage";
import { ICarImagesRepository } from "../../repositories/ICarsImagesRepository";


interface IRequest {
    car_id: string
    images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carImagesRepository: ICarImagesRepository
    ) {}

    async execute({car_id, images_name}: IRequest): Promise<void> {
        images_name.map(async image => {
            await this.carImagesRepository.create(car_id, image)
        })
    }
}

export { UploadCarImagesUseCase }