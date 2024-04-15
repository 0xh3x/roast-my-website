# Roast My Website

Roast My Website is a web application that allows users to submit their website URLs and receive feedback and suggestions for improvement.


## Local Development
- `cp .env.example .env`
- Update your OpenAI api key in `.env` file

Launch Docker Desktop and launch docker compose in watch mode:   
`docker compose watch`

Monitor logs:  
`docker compose logs -f`

## Deploy
Use AWS Copilot CLI to deploy the application:

`copilot deploy`

## Invoke OpenAI roaster on sample screenshot
`npm run cli`