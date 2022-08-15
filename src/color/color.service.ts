import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator'; 
import { Repository } from 'typeorm';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorService {

  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>
  ) { }


  async create(createColorDto: CreateColorDto): Promise<Color> {
   const isExist = await this.findByName(createColorDto.name);

    if (isExist) {
      const errors = { Color: ' already exist!' };
      throw new HttpException({ errors }, 401);
    }
    let newColor = new Color();
    newColor.name = createColorDto.name;

    const errors = await validate(newColor);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);
    } else {
      return await this.colorRepository.save(newColor);
    }

  }


  async findByName(name: string): Promise<Color> {
    return await this.colorRepository.findOne({ where: { name } });
  }



  async findAll(): Promise<Color[]> {
    return await this.colorRepository.find();
  }


  async findOne(id: number): Promise<Color> { 

    const color = await this.isExist(id);
    if (!color) {
      throw new HttpException('Color not found, please try again.', HttpStatus.NOT_FOUND);
    }
    return color;

  }


  async isExist(id: number): Promise<Color> {
    return await this.colorRepository.findOneBy({ id });
  }



  async update(id: number, updateColorDto: UpdateColorDto) {
    const color = await this.isExist(id);
    if (!color) {
      throw new HttpException('Color not found, please try again.', HttpStatus.NOT_FOUND);
    }
    await this.colorRepository.update(id, updateColorDto);

    return 'Color successfully updated!'
  }



  async remove(id: number) {
    const color = await this.isExist(id);
    if (!color) {
      throw new HttpException('Color not found, please try again.', HttpStatus.NOT_FOUND);
    }
    await this.colorRepository.delete(id);

    return 'Color successfully deleted!';
  }

}
