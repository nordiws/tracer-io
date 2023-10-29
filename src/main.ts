import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { SwaggerConfig } from './config/swagger.config'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'

const PORT = process.env.PORT || 5000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const swaggerConfig = new SwaggerConfig();
  swaggerConfig.configureSwagger(app);

  app.enableCors({
    origin: true
  })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(PORT)
  console.log(`Tracer.io running on port: ${PORT}`);
}
bootstrap();
