import { Module } from '@nestjs/common';
import { TelegramModule } from "./telegram/telegram.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from "typeorm";
import { ProjectsModule } from './projects/projects.module';
import { BriefModule } from './brief/brief.module';

@Module({
  imports: [
    TelegramModule,
    TypeOrmModule.forRootAsync({
      useFactory: async ()=>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ProjectsModule,
    BriefModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
