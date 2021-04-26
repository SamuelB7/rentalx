import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })

    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            brand: "Car 1",
            daily_rate: 100,
            description: "Car description",
            fine_amount: 150,
            license_plate: "DEF-1234",
            name: "Car brand",
            category_id: "402d2741-fbba-476e-a9c1-22463c5c84a0"
        })

        const cars = await listAvailableCarsUseCase.execute({})
        
        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Car 2",
            daily_rate: 100,
            description: "Car description",
            fine_amount: 150,
            license_plate: "DEF-1234",
            name: "Car brand 2",
            category_id: "402d2741-fbba-476e-a9c1-22463c5c84a0"
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car brand 2"
        })
        
        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Car 3",
            daily_rate: 100,
            description: "Car description",
            fine_amount: 150,
            license_plate: "DEF-4321",
            name: "Car brand 2",
            category_id: "402d2741-fbba-476e-a9c1-22463c5c84a0"
        })

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car 3"
        })

        
        
        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Car 4",
            daily_rate: 100,
            description: "Car description",
            fine_amount: 150,
            license_plate: "DEF-12345",
            name: "Car brand 2",
            category_id: "12345"
        })

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345"
        })

        
        
        expect(cars).toEqual([car])
    })
})