import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerConfig {
  private title: string = "Tracer.io";
  private description: string = "Record and store data related to harvests, strains, and plants";
  private version: string = "1.0.0";
  private serverUrls: Array<string> = [`http://localhost:${process.env.PORT}`];

  public configureSwagger(app: INestApplication): void {
    const swaggerOptions = new DocumentBuilder()
      .setTitle(this.title)
      .setDescription(this.description)
      .setVersion(this.version)

    this.serverUrls.forEach((serverUrl) => {
      swaggerOptions.addServer(serverUrl);
    });

    const docs = SwaggerModule.createDocument(app, swaggerOptions.build());
    SwaggerModule.setup('docs', app, docs);
  }
}
