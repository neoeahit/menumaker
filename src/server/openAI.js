import 'openai/shims/node'
import OpenAI from 'openai'

const CHATGPT_MODEL = process.env.CHATGPT_MODEL || 'gpt-4-1106-preview'

const settings = {
  messages: [
    {
      role: 'system',
      content: 'I am writing descriptions of dishes for a menu. I am going to provide you with a list of ingredients. Based on that list, please come up with a dish that can be created with those ingredients.'
    }
  ],
  functions: [
    {
      name: 'updateDish',
      description: 'Generate a fine dining dish based on a list of ingredients',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Name of the dish, as it would appear on a fine dining menu'
          },
          description: {
            type: 'string',
            description: 'Description of the dish, in 2-3 sentences, as it would appear on a fine dining menu'
          },
          ingredients: {
            type: 'array',
            description: 'List of all ingredients—both provided and additional ones in the dish you have conceived—capitzlied, along with measurements, that would be needed to make 8 servings on this dish',
            items: {
              type: 'object',
              properties: {
                ingredient: {
                  type: 'string',
                  description: 'Name of ingredient'
                },
                amount: {
                  type: 'string',
                  description: 'Amount of ingredient needed for recipe'
                }
              }
            }
          },
          recipe: {
            type: 'array',
            description: 'Ordered list of recipe steps, numbered as "1.", "2.", etc., needed to make this dish',
            items: {
              type: 'string',
              description: 'Recipe step'
            }
          }
        },
        required: ['title', 'description', 'ingredients', 'recipe']
      }
    }
  ],
  model: CHATGPT_MODEL,
  function_call: 'auto'
}

const send = async (ingredients) => {
  const openai = new OpenAI()
  settings.messages.push({
    role: 'user',
    content: `The ingredients that will contribute to my dish are: ${ingredients}.`
  })
  const completion = await openai.chat.completions.create(settings)
  return completion.choices[0].message
}

export default {
  send
}
