import { ApiTags } from '@nestjs/swagger';
import { AppService } from '../services/app.service';
import { Controller, Get } from '@nestjs/common';

@ApiTags("AppController")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}