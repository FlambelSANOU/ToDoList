import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

/**
 * Root module of the application.
 * Configure environmnt variables, database connection, and import feature modules
 */
@Module({
  imports: [
    /**
     * Load environment variables from .env and makes them globally accessible
     * via process.env or ConfigService.
     */
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    /**
     * Connects to the MongoDB database using the Mongoose driver.
     * Uses `process.env.DB_URL` if defined, or falls back to a hardcoded default URI.
     */
    MongooseModule.forRoot(
      process.env.DB_URL || 'mongodb+srv://yabi_events:Entreprise1230@yabievents.xx9vf.mongodb.net/?retryWrites=true&w=majority&appName=YabiEvents'
    ),

    /** Imports the task feature module containing controller, service, and schema */
    TasksModule,
  ],
})
export class AppModule {}
