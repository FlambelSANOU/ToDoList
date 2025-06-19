import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Mongoose document type for the Task model.
 * Extends the base Task class with Mongoose's Document type.
 */
export type TaskDocument = Task & Document;

/**
 * Task schema definition for MongoDB using Mongoose.
 * Includes automatic timestamps for createdAt and updatedAt.
 */
@Schema({ timestamps: true })
export class Task {

  /**
   * Task title (required).
   * Limited to 255 characters max.
   */
  @Prop({ required: true, maxlength: 255 })
  title: string;

  /**
   * Task description (required).
   */
  @Prop({ required: true })
  description: string;

  /**
   * Completion status of the task.
   * Defaults to false (not completed).
   */
  @Prop({ default: false })
  completed: boolean;

  /**
   * Priority level of the task.
   * Can be 'low', 'medium', or 'high'.
   * Defaults to 'medium'.
   */
  @Prop({ default: 'medium' })
  priority: 'low' | 'medium' | 'high';

  /**
   * Optional due date for the task.
   */
  @Prop()
  dueDate?: Date;

  /**
   * Task category (e.g., personal, work).
   * Defaults to 'personal'.
   */
  @Prop({ default: 'personal' })
  category: string;
}

/**
 * Mongoose schema factory for the Task clas
 */
export const TaskSchema = SchemaFactory.createForClass(Task);

/**
 * Middleware to auto-generate a sequential numeric `id` field
 * each time a new task is created.
 * This is separate from the MongoDB `_id` field.
 */
TaskSchema.pre('save', async function (next) {
  if (this.isNew) {
    const model = this.constructor as any;
    const count = await model.countDocuments();
    this['id'] = count + 1
  }
  next();
});
