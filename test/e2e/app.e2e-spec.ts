import { setupTestModule, teardownTestModule } from './app.e2e-setup'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await setupTestModule()
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  });


  afterAll(async () => {
    await teardownTestModule()
  })
});
