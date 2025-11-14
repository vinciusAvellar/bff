import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { DashboardService } from './bff.service';
// Importe o DTO de criação para a rota POST (Assumindo que você o copiou para o BFF)
import { CreateCaronaDto } from './bff.dto';

@Controller('mobile/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // 1. CREATE (POST)
  @Post()
  async create(@Body() dto: CreateCaronaDto) {
    return await this.dashboardService.createCarona(dto);
  }

  // 2. READ ALL (GET) - JÁ FUNCIONA
  @Get()
  async getMobileDashboard() {
    return this.dashboardService.getDashboardData();
  }

  // 3. READ ONE (GET /:id)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Note: Converte para número, pois o MS Caronas usa INT
    return this.dashboardService.findOneCarona(+id);
  }

  // 4. DELETE (DELETE /:id)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.dashboardService.removeCarona(+id);
  }
}
