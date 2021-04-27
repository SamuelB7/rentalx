import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, password, driver_license } = request.body

            const createUserUseCase = container.resolve(CreateUserUseCase)

            await createUserUseCase.execute({name, email, password, driver_license})

            return response.status(201).send()
        } catch (AppError) {
            return response.status(AppError.statusCode).json(AppError.message)
        }
    }
}

export { CreateUserController }