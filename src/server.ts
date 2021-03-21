import express from 'express'
import { router } from './routes'

const app = express()

app.use(express.json())

app.use(router)

app.listen(777, () => console.log('Server Ok!'))