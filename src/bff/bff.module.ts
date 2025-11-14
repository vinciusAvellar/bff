import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DashboardController } from './bff.controller';
import { DashboardService } from './bff.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE_CARONAS',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3001 },
      },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
