import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRO } from './dto/interface';
import { validate } from 'class-validator';
const jwt = require('jsonwebtoken');

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }


  async findById(id: number): Promise<UserRO> {

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }
    return this.buildUserRO(user);
  }



  async create(createUserDto: CreateUserDto): Promise<UserRO> {
    let newUser = new User();
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;

    const errors = await validate(newUser);

    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);

    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }
  }



  async remove(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('User not found, please try again.', HttpStatus.NOT_FOUND);
    }
    return await this.userRepository.delete({ id });
  }



  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    if(!user){
      throw new HttpException('User not found, please try again.', HttpStatus.NOT_FOUND);
    }
   return await this.userRepository.update(id, updateUserDto);

  }


  private buildUserRO(user: User) {
    const userRO = {
      id: user.id,
      username: user.username,
      email: user.email,
      token: this.generateJWT(user),
      password: user.password
    };

    return { user: userRO };
  }





  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      exp: exp.getTime() / 1000,
    });

  };

  

}
 

 
