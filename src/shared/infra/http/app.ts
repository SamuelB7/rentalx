import 'reflect-metadata'
import "dotenv/config"
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-error'
import swaggerUI from 'swagger-ui-express'
import '../typeorm'
import '../../container'
import { router } from './routes'
import swaggerFile from '../../../swagger.json'
import { AppError } from '../../errors/AppError'
import upload from '../../../config/upload'
import rateLimiter from "../http/middlewares/rateLimiter"

const app = express()

app.use(rateLimiter)

app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
})

export { app }