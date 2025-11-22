import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configration';
import { AzureDevOpsService } from './azure-devops.service';
import { MCPController } from './mcp.controller';
import configSetup from './config/configration';

@Module({
  imports: [ConfigModule.forRoot({
   isGlobal: true,
   ...configSetup,
  })],
  controllers: [AppController,MCPController],
  providers: [AppService, AzureDevOpsService],
})
export class AppModule { }
