import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "../../../../shared/errors/AppError"
import { UsersRepositoryInMemory } from "../../repositories/im-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "../../repositories/im-memory/UsersTokensRepositoryInMemory"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        mailProvider = new MailProviderInMemory()
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        )
    })

    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail")

        await usersRepositoryInMemory.create({
            driver_license: "1234",
            email: "user@email.com",
            name: "User Name",
            password: "4321"
        })

        await sendForgotPasswordMailUseCase.execute("user@email.com")

        expect(sendMail).toHaveBeenCalled()
    })

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("notuser@email.com")
        ).rejects.toEqual(new AppError("User does not exists!"))
    })

    it("should be able to create an users token", async () => {
        const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create")

        usersRepositoryInMemory.create({
            driver_license: "789456",
            email: "anotheruser@email.com",
            name: "Another User Name",
            password: "1234"
        })

        await sendForgotPasswordMailUseCase.execute("anotheruser@email.com")

        expect(generateTokenMail).toBeCalled()
    })
})