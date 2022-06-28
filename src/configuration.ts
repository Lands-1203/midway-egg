import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import * as orm from '@midwayjs/orm';
import * as validate from '@midwayjs/validate';
import * as jwt from '@midwayjs/jwt';

@Configuration({
  imports: [egg, orm, validate, jwt],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;
  async onReady() {}
}
