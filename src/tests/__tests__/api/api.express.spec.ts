import request from 'supertest';
import { Express, Request, Response } from 'express';

import { ApiExpress } from '../../../api/express/api.express';

describe('ApiExpress', () => {
  let api: ApiExpress;
  let app: Express;

  beforeAll(() => {
    api = ApiExpress.build();
    app = api.app;

    api.addGetRoute('/test-get', async (req: Request, res: Response) => {
      res.status(200).send({ message: 'GET success' });
    });

    api.addPostRoute('/test-post', async (req: Request, res: Response) => {
      const { message } = req.body;
      res.status(200).send({ received: message });
    });
  });

  it('should respond with 200 on GET /test-get', async () => {
    const response = await request(app).get('/test-get');
    expect(response.status).toBe(200);
  });

  it('should respond with 200 on POST /test-post', async () => {
    const postData = { message: 'Hello, world!' };
    const response = await request(app)
      .post('/test-post')
      .send(postData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ received: 'Hello, world!' });
  });

  it('should respond with 404 for undefined route', async () => {
    const response = await request(app).get('/undefined-route');
    expect(response.status).toBe(404);
  });
});
