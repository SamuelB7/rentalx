import { AppError } from "../../../../shared/errors/AppError"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/im-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })
    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "12345",
            email: 'user@email.com',
            password: "1234",
            name: "User Test"
        }
        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.excute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")
    })
    it("should not be able to authenticate a non existent user", () => {
        expect( async () => {
            await authenticateUserUseCase.excute({
                email: "false@email.com",
                password: "wrongpassword"
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to authenticate with incorrect password", () => {
        expect( async () => {
            const user: ICreateUserDTO = {
                driver_license: "54321",
                email: 'email@email.com',
                password: "4321",
                name: "User Test Error"
            }
            await createUserUseCase.execute(user)

            await authenticateUserUseCase.excute({
                email: user.email,
                password: "incorrectpassword"
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})