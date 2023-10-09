import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle("Tracer.io")
    .setDescription("Record and store data related to harvests, strains, and plants")
    .setVersion("1.0.0")
    .build()

  const docs = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, docs)

  await app.listen(PORT)
  console.log(`Tracer.io running on port: ${PORT}`);
}
bootstrap();
