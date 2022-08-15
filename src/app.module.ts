import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ColorModule } from './color/color.module';
import { LabelModule } from './label/label.module';
import { TeamModule } from './team/team.module';
import { NotificationModule } from './notification/notification.module';
import { FavouriteModule } from './favourite/favourite.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { ProjectModule } from './project/project.module';
import { CommentModule } from './comment/comment.module';
import { UserNotificationModule } from './user-notification/user-notification.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ColorModule,
    LabelModule,
    TeamModule,
    NotificationModule,
    FavouriteModule,
    TodoModule,
    ProjectModule,
    CommentModule,
    UserNotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
