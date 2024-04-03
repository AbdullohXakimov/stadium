import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';

@Module({
  imports: [],
  controllers: [],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
