import { AppModule } from './domain/modules/app.module'
import { NestFactory } from '@nestjs/core'
import { SwaggerConfig } from './config/swagger.config'

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const swaggerConfig = new SwaggerConfig();
  swaggerConfig.configureSwagger(app);

  app.enableCors({
    origin: true
  })
  await app.listen(PORT)
  console.log(`Tracer.io running on port: ${PORT}`);
}
bootstrap();
