import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtGuard } from './common/guards';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
  .setTitle('Proj Documentation')
  .setDescription('The Proj API description')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('proj')
  .build();


const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  const port = configService.get('PORT');
  await app.listen(port);

}
bootstrap();
