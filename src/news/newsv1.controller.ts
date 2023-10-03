import { Controller, Get } from '@nestjs/common';

@Controller({
    path:'news',
    version: '2',
  })
export class Newsv1Controller {
    @Get()
    findAll() {
      return {
        message:"from controller v2"
      }
    }
  
}
