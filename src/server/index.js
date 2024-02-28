import express from 'express';
import AI from './ai.js';

const server = express();
server.use(express.json());

server.post('/ingredients', async (req, res) => {
  console.log(`Request to /ingredients received: ${req.body.message}`);
  if (typeof req.body.message === 'undefined' || !req.body.message.length) {
    res
      .status(400)
      .json({ error: 'No ingredients provided in "message" key of payload.' });
    return;
  }
  try {
    const completionResponse = await AI.send(req.body.message);
    res.json(completionResponse.function_call);
    console.log(completionResponse.function_call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default server;
