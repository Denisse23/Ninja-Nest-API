import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjaDto } from './dto/ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas: Array<NinjaDto> = [];

  getNinjas(weapon?: NinjaDto['weapon']) {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  getNinjaById(id?: string) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('Ninja not found!');
    }

    return ninja;
  }

  createNinja(ninja: CreateNinjaDto) {
    const newNinja = {
      id: Date.now() + '',
      ...ninja,
    };
    this.ninjas.push(newNinja);

    return newNinja;
  }

  updateNinjaById(id: string, ninja: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((currentNinja) => {
      if (currentNinja.id === id) {
        return { ...currentNinja, ...ninja };
      }

      return currentNinja;
    });

    return this.getNinjaById(id);
  }

  deleteNinjaById(id: string) {
    const ninja = this.ninjas.findIndex((ninja) => ninja.id === id);

    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    return ninja;
  }
}
