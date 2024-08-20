import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import nodeCleanup from 'node-cleanup'
import routes from './routes.js'
import { cleanup, init } from './whatsapp.js'

const app = express()

const host = process.env.WA_SERVER_HOST || '0.0.0.0'
const port = parseInt(process.env.PORT || process.env.WA_SERVER_PORT || 8000)

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', routes)

const listenerCallback = () => {
    init()
    console.log(`Server is listening on http://${host}:${port}`)
}

app.listen(port, host, listenerCallback)

nodeCleanup(cleanup)

export default app
