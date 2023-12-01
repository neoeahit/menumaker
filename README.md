# Menu Maker

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

This is a Node.js Express API server that also serves a React frontned.

The frontend can be found at `/index.html` (or simply `/`).

The backend API has a single endpoint. `POST /ingredients` takes a list of ingredients (as a single string) and then sends a request to OpenAI's chat completion API to generate content around a restaurant dish that can be made with those ingredients.

The implementation uses OpenAI ChatGPT functions, which allows us to specify the JSON structure of the data to be returned, which can more easily be passed as arguments directly to a function in our code (or, in this case, to be passed back to the frontend, which will use the arguments for a function call there).

To use this backend, you will need an OpenAI API Key to make calls to the chat completion API.

## Local setup

This project is set to use Node `v20.10.0`. Install and use this version with [`volta`](https://volta.sh).

1. Install dependencies

```bash
yarn install
```

1. Make local copy of `.env` and customize

```bash
cp .env.template .env
```

1. Edit `.env` to add environment variables

Add `OPENAI_API_KEY` (which you will need to obstain from your OpenAI account).

If you want to use a port other than the default (`3000`), add `PORT` environment variable.

If you want to use a different [ChatGPT model](https://platform.openai.com/docs/models/overview) than the default (`gpt-3.5-turbo-1106`), add `CHATGPT_MODEL` environment variable.

## Local deploy

Start API server on (default) port 3000

```bash
yarn build && yarn start
```

## Local tests

```bash
yarn test
```

## Heroku deploy

Be sure to add `OPENAI_API_KEY` environment variable.
