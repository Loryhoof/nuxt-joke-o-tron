import axios from "axios"


export default defineEventHandler( async (event) => {

    const config = useRuntimeConfig()

    const { text } = getQuery(event) as any

    if(text.length >= 100) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Prompt too long'
        })
    }

    const systemPrompt = `Only tell jokes, nothing else.`

    const requestData = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: text
            }
        ]
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
            headers:{
                Authorization: `Bearer ${config.OPENAI_PK}`,
                'Content-Type':"application/json",
            }
        })

        const data = response.data.choices[0].message.content

        return data
    }
    catch(err) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Issue making request to OpenAI'
        })
    }
})