import 'openai/shims/node';
import OpenAI from 'openai';

const CHATGPT_MODEL = process.env.CHATGPT_MODEL || 'gpt-3.5-turbo-1106';
const PROMPT =
  'I am writing descriptions of dishes for a menu. I am going to provide you with a list of ingredients. Based on that list, come up with a dish that can be created with those ingredients. If no dish can be formed with those ingredients, then keep adding a new ingredient one at a time to find the next possible dish';

const settings = {
  functions: [
    {
      name: 'updateDish',
      description: 'Generate a fine dining dish based on a list of ingredients',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description:
              'Name of the dish, as it would appear on a fine dining menu',
          },
          description: {
            type: 'string',
            description:
              'Description of the dish, in 2-3 sentences, as it would appear on a fine dining menu',
          },
	  origin: {
            type: 'string',
            description:
              'The country of origin of the dish as it would appear on a fine dining menu',
          },
          timetocook: {
            type: 'string',
            description:
              'The estimated time it would take to make the dish',
          },
          ingredients: {
            type: 'array',
            description:
              'List of all ingredients—both provided and additional ones in the dish you have conceived—capitalized, along with measurements, that would be needed to make 8 servings on this dish',
            items: {
              type: 'object',
              properties: {
                ingredient: {
                  type: 'string',
                  description: 'Name of ingredient',
                },
                amount: {
                  type: 'string',
                  description: 'Amount of ingredient needed for recipe',
                },
              },
            },
          },
          recipe: {
            type: 'array',
            description:
              'Ordered list of recipe steps in detail, numbered as "1.", "2.", etc., needed to make this dish',
            items: {
              type: 'string',
              description: 'Recipe step',
            },
          },
        },
        required: ['title', 'description', 'ingredients', 'recipe', 'origin', 'timetocook'],
      },
    },
  ],
  model: CHATGPT_MODEL,
  function_call: 'auto',
};

const send = async (ingredients) => {
  const openai = new OpenAI({
    timeout: 10000,
    maxRetries: 3,
  });
  settings.messages = [
    {
      role: 'system',
      content: PROMPT,
    },
    {
      role: 'user',
      content: `The ingredients that will contribute to my dish are: ${ingredients}.`,
    },
  ];
  const completion = await openai.chat.completions.create(settings);
  return completion.choices[0].message;
};

export default {
  send,
};
