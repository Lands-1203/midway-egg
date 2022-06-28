import { UserLoginDTO } from "./../dto/user.dto";
import { Inject, Controller, Post, Query } from "@midwayjs/decorator";
import { Context } from "egg";
import { IGetUserResponse } from "../interface";
import { UserService } from "../service/user.service";
import { JwtService } from "@midwayjs/jwt";
import { Validate } from "@midwayjs/validate";

@Controller("/api/user")
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;
  @Inject()
  jwtService: JwtService;

  @Post("/login")
  @Validate()
  async getUserByUsernameAndPassword(
    @Query() userDto: UserLoginDTO
  ): Promise<IGetUserResponse> {
    const userInfo = await this.userService.getUserByUsernameAndPassword(
      userDto.username,
      userDto.password
    );
    if (userInfo) {
      const token = await this.jwtService.sign({ userInfo: userInfo.id });
      return {
        code: 200,
        success: true,
        message: "登录成功",
        data: {
          token: token,
        },
      };
    }
    return {
      code: 400,
      success: false,
      message: "账号或密码不正确",
      data: null,
    };
  }

  @Post("/createUser")
  @Validate()
  async createUser(@Query() userDto: UserLoginDTO): Promise<IGetUserResponse> {
    const id = await this.userService.saveUserEntity(
      userDto.username,
      userDto.password
    );
    if (id) {
      return {
        success: true,
        message: "创建成功",
        data: { id },
      };
    }
    return {
      success: false,
      message: "创建失败，请稍后再试",
      data: null,
    };
  }
}
