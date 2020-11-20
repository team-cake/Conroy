import express from 'express'
import cors from 'cors'

import { WebhookClient } from 'dialogflow-fulfillment'

// intent method imports
import { fallback } from './intents/fallback'
import { welcome } from './intents/welcome'

const app = express()

const PORT: number = 8080

app.use(
    cors({ origin: '*' }),
    express.json(),
)

// Map of intent-name to their respective method
const intents = new Map<string, (agent: any) => void>()

// Set specific intent-name to it's respective method
intents.set('Default Fallback Intent', fallback)
intents.set('Default Welcome Intent', welcome)

app.post('/', async (req, res) => {
    const agent: any = new WebhookClient({ request: req, response: res })

    await agent.handleRequest(intents)
})

app.listen(PORT, () => console.log(`Server started on port: ${PORT}!`))