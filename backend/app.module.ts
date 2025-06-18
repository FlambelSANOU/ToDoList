import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL || 'mongodb+srv://yabi_events:Entreprise1230@yabievents.xx9vf.mongodb.net/?retryWrites=true&w=majority&appName=YabiEvents'),
    TasksModule,
  ],
})
export class AppModule {} 