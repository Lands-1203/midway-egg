import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { UserEntity } from '../entity/user.entity';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user.service';

@Controller('/user')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/getUserByIdAndPwd')
  async getUserByUsernameAndPassword(
    @Query('username') username: string,
    @Query('password') password: string
  ): Promise<IGetUserResponse<UserEntity | null>> {
    const userInfo = await this.userService.getUserByUsernameAndPassword(
      username,
      password
    );
    console.log(userInfo);
    if (userInfo) {
      return {
        success: true,
        message: 'OK',
        data: userInfo,
      };
    }
    return {
      success: false,
      message: '查询失败',
      data: null,
    };
  }

  @Get('/createUser')
  async createUser(
    @Query('username') username: string,
    @Query('password') password: string
  ): Promise<IGetUserResponse<null>> {
    const id = await this.userService.saveUserEntity(username, password);
    if (id) {
      return {
        success: true,
        message: '创建成功',
        data: null,
      };
    }
    return {
      success: false,
      message: '创建失败，请稍后再试',
      data: null,
    };
  }
}
