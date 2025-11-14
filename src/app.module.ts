import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DashboardModule } from './bff/bff.module'; // Importa a lógica de agregação
@Module({
  imports: [
    // 1. Configura o cliente HTTP para chamadas internas
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    // 2. Importa o módulo que contém o Service e o Controller do BFF
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
