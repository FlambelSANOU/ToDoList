import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true, maxlength: 255 })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ default: 'medium' })
  priority: 'low' | 'medium' | 'high';

  @Prop()
  dueDate?: Date;

  @Prop({ default: 'personal' })
  category: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

// Auto-increment ID middleware
TaskSchema.pre('save', async function(next) {
  if (this.isNew) {
    const model = this.constructor as any;
    const count = await model.countDocuments();
    this['id'] = count + 1;
  }
  next();
}); 