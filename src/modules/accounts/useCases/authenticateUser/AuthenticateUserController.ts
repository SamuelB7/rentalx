import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'


class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { password, email } = request.body

            const authenticateUserUsecase = container.resolve(AuthenticateUserUseCase)

            const token = await authenticateUserUsecase.excute({email, password})

        return response.json(token)
        } catch (error) {
            return response.status(error.statusCode).json(error.message)
        }
    }
}

export { AuthenticateUserController }