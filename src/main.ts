import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VERSION_NEUTRAL, ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtGuard } from './common/guards';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { EventsGateway } from './messages/events/events.gateway';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet())

  app.enableCors({
    origin:['http://localhost:3000','http://localhost:3002']
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  app.setGlobalPrefix('ff');
  app.enableVersioning({
    type: VersioningType.URI,
    // defaultVersion:'',
    // defaultVersion:'1',

  })
  // app.setGlobalPrefix('v1', { exclude: ['cats'] });


  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
  .setTitle('FF Documentation')
  .setDescription('The ff API description')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('ff')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('ff/api', app, document);




  const port = configService.get('PORT');
  await app.listen(port);


}
bootstrap();
