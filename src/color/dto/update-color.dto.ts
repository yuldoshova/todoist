import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateColorDto } from './create-color.dto';

export class UpdateColorDto  {
 
    @IsString()
    @IsNotEmpty()
    name?: string;

}
