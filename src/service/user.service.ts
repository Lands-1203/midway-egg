import { Provide } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/orm";
import { Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity";

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;
  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(username, password): Promise<UserEntity> {
    let user = null;
    try {
      user = await this.userModel.findOne({
        where: {
          username,
          password,
        },
      });
    } catch (error) {
      console.dir(error);
    }
    return user;
  }
  /**
   * 创建一个用户 返回Id代表数据库执行成功 否则失败
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async saveUserEntity(username, password): Promise<number> {
    let user = new UserEntity();
    user.password = password;
    user.username = username;

    try {
      let oldUser = null;
      oldUser = await this.userModel.findOne({
        where: {
          username,
        },
      });
      if (!oldUser) {
        user = await this.userModel.save(user);
      }
      throw new Error("用户存在！");
    } catch (error) {
      console.dir(error);
    }
    return user.id;
  }
}
