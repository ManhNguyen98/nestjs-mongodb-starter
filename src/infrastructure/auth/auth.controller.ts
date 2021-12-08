import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RegistrationM, RequestWithUser } from '@domain/model/auth';
import { ApiResponseType } from '../common/swagger/response.decorator';
import { LoggerService } from '../logger/logger.service';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';

@Controller('api/v2/auth')
@ApiTags('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: DatabaseUserRepository,
    private readonly logger: LoggerService,
  ) {}

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      req.user._id,
    );

    req.res.setHeader('Set-Cookie', accessTokenCookie);
    return req.user;
  }

  @Post('register')
  @ApiResponseType(RegistrationM, false)
  async register(@Body() registrationData: RegistrationM) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    try {
      const { user } = req;
      const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
        user._id,
      );
      const { cookie: refreshTokenCookie, token: refreshToken } =
        this.authService.getCookieWithJwtRefreshToken(user._id);
      await this.userRepository.setCurrentRefreshToken(refreshToken, user._id);
      res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
      return res.status(200).json({ data: { message: 'Login successfully' } });
    } catch (error) {
      this.logger.error('[Auth]', error);
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logout(@Req() req: RequestWithUser, @Res() res: Response) {
    await this.userRepository.removeRefreshToken(req.user._id);
    res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
    return res.status(200).json({ data: { message: 'Logout successfully' } });
  }

  @Get()
  @UseGuards(JwtRefreshGuard)
  authenticate(@Req() req: RequestWithUser) {
    const user = req.user;
    return user;
  }
}
