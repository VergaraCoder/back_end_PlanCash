import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategy/local.strategy';
import { LocalGuard } from './guard/local.guard';
import { JwtGuard } from './guard/jwt.guard';

@Module({
  imports:[
    forwardRef(()=>UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    LocalGuard,
    JwtGuard,
    AuthService,
    ],
  exports:[
    JwtGuard,
    LocalGuard,
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
