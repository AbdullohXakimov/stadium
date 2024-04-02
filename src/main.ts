import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Stadium')
    .setDescription('MIni project for stadium finder')
    .setVersion('1.0.0')
    .addTag(
      'NodeJS, NestJS, Postgres, Sequelize, JWT, Swagger, Bot, SMS, Mailer',
    )
    .build();
  const PORT = process.env.PORT || 3030;
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
}
bootstrap();
