import { NestFactory } from '@nestjs/core';
import { ValidationPipe, } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app =
    await NestFactory.create(AppModule,{bufferLogs: true,},);
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.setGlobalPrefix(
    process.env.API_PREFIX || 'api/v1',
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor(),);
  app.useGlobalFilters(new HttpExceptionFilter(),);
  const swaggerConfig =
    new DocumentBuilder()
      .setTitle(
        'Agnos Healthcare API',
      )
      .setDescription(
        'Healthcare Integration API',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();
  const swaggerDocument =
    SwaggerModule.createDocument(
      app,
      swaggerConfig,
    );
  SwaggerModule.setup(
    'docs',
    app,
    swaggerDocument,
  );
  
  app.enableCors();
  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1); // ปิด Process หาก Start ไม่สำเร็จ
});
