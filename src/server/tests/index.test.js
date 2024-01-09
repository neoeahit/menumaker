import { jest } from '@jest/globals';
import request from 'supertest';
import server from '../index';
import AI from '../ai';
import sampleResponse from '../test_data/sample_response.json';

AI.send = jest.fn(() => {
  return JSON.stringify(sampleResponse);
});

const sendRequest = async (body) => {
  const response = await request(server).post('/ingredients').send(body);
  return response;
};

describe('API tests', () => {
  describe('POST /ingredients', () => {
    describe('when payload does not have "message" key', () => {
      const payload = {};
      test('should not tell AI to "send"', async () => {
        await sendRequest(payload);
        expect(AI.send).not.toHaveBeenCalled();
      });
      test('should return 400', async () => {
        const response = await sendRequest(payload);
        expect(response.statusCode).toBe(400);
      });
    });
    describe('when payload "message" has no content', () => {
      const payload = { message: '' };
      test('should not tell AI to "send"', async () => {
        await sendRequest(payload);
        expect(AI.send).not.toHaveBeenCalled();
      });
      test('should return 400', async () => {
        const response = await sendRequest(payload);
        expect(response.statusCode).toBe(400);
      });
    });
    describe('when payload" message" has content', () => {
      const ingredients = 'carrots, parsnips, cauliflower';
      const payload = { message: ingredients };
      test('should tell AI to "send"', async () => {
        await sendRequest(payload);
        expect(AI.send).toHaveBeenCalledWith(ingredients);
      });
      test('should return 200', async () => {
        const response = await sendRequest(payload);
        expect(response.statusCode).toBe(200);
      });
    });
  });
});
