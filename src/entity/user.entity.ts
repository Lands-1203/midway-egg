import { EntityModel } from "@midwayjs/orm";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@EntityModel("userEntity")
export class UserEntity {
  constructor({ username, password, id }) {
    this.username = username;
    this.password = password;
  }
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "用户的自增ID",
  })
  id: number; // 自增主键

  @Column("varchar", {
    name: "username",
    comment: "用户名",
    length: 64,
  })
  username: string;

  @Column("varchar", {
    name: "password",
    nullable: true,
    comment: "用户密码",
    length: 64,
  })
  password: string | null;
  s;
}
