import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Bootstraps the NestJS application
 * Sets up global middleware, validation, and CORS configuration.
 */
async function bootstrap() {
  // Create an instance of the NestJS application using the root module
  const app = await NestFactory.create(AppModule)
  
  /**
   * Enable CORS to allow the Angular frontend (http://localhost:4200)
   * to communicate with this backend (e.g., for development).
   */
  app.enableCors({
    origin: 'http://localhost:4200', // Replace with production domain in prod
    credentials: true,              // Allow sending cookies/auth headers
  });
  
  /**
   * Global validation pipe:
   * - `whitelist`: strips properties that do not have decorators
   * - `forbidNonWhitelisted`: throws error if unknown properties are found
   * - `transform`: automatically transforms payloads to match DTO types
   */
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Start the application on the specified port (default: 3000)
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`)
}
bootstrap();
