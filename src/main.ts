import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VERSION_NEUTRAL, ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtGuard } from './common/guards';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { EventsGateway } from './messages/events/events.gateway';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  app.setGlobalPrefix('proj');
  app.enableVersioning({
    type: VersioningType.URI,
    // defaultVersion:'',
    // defaultVersion:'1',

  })
  // app.setGlobalPrefix('v1', { exclude: ['cats'] });


  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
  .setTitle('Proj Documentation')
  .setDescription('The Proj API description')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('proj')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('proj/api', app, document);




  const port = configService.get('PORT');
  await app.listen(port);


}
bootstrap();
