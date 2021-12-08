import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { parse } from 'url';
import JwtRefreshGuard from '../auth/guards/jwt-refresh.guard';
import { ViewAuthFilter } from '../common/filter/viewAuth.filter';
import { ViewsService } from './views.service';

interface RequestWithUser extends Request {
  user: any;
}
@Controller('/')
@ApiExcludeController()
export class ViewController {
  constructor(private viewService: ViewsService) {}

  async handler(req: Request, res: Response) {
    const parseUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parseUrl.pathname, parseUrl.query);
  }

  @Get(['home', 'import/uber-eats'])
  @UseGuards(JwtRefreshGuard)
  @UseFilters(ViewAuthFilter)
  public async showPage(@Req() req: RequestWithUser, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    const serverSideProps = { dataFromController: '123' };
    await this.viewService
      .getNextServer()
      .render(
        req,
        res,
        parsedUrl.pathname,
        Object.assign(parsedUrl.query, serverSideProps),
      );
  }

  @Get(['login', '_next*'])
  public async assets(@Req() req: RequestWithUser, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query);
  }
}
