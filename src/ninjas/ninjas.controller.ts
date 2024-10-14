import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjasService } from './ninjas.service';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { BeltGuard } from '~/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  @Get()
  getNinjas(@Query('weapon') weapon: 'starts' | 'nunchucks') {
    return this.ninjasService.getNinjas(weapon);
  }

  @Get(':id')
  getNinjaById(@Param('id') id: string) {
    return this.ninjasService.getNinjaById(id);
  }

  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) ninja: CreateNinjaDto) {
    return this.ninjasService.createNinja(ninja);
  }

  @Put(':id')
  updateNinjaById(@Param('id') id: string, @Body() ninja: UpdateNinjaDto) {
    return this.ninjasService.updateNinjaById(id, ninja);
  }

  @Delete(':id')
  deleteNinjaById(@Param('id') id: string) {
    return this.ninjasService.deleteNinjaById(id);
  }
}
