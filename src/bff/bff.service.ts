import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// Interfaces básicas para os dados - EXPORTADAS!
export interface CaronaData {
  id: number;
  origem: string;
  destino: string;
  valor: number;
  dataHora: Date;
}

// DTO de Criação (O BFF precisa dessa interface/classe para a rota POST)
export interface CreateCaronaDto {
  origem: string;
  destino: string;
  dataHora: Date;
  valor: number;
}

@Injectable()
export class DashboardService {
  constructor(
    @Inject('SERVICE_CARONAS') private readonly caronasClient: ClientProxy,
  ) {}

  // =============================================================
  // 1. READ ALL (FIND ALL) - MÉTODO JÁ FUNCIONAL
  // =============================================================
  async getDashboardData() {
    const payload = {};

    try {
      const caronasObservable = this.caronasClient.send<CaronaData[]>(
        { cmd: 'caronas.findAll' },
        payload,
      );

      const caronasResult = await firstValueFrom(caronasObservable);
      const caronas: CaronaData[] = caronasResult;

      return {
        totalCaronas: caronas.length,
        lista: caronas,
      };
    } catch (error) {
      console.error('BFF Caronas Error:', error.message);
      throw new InternalServerErrorException(
        'Falha ao buscar caronas do Microservice.',
      );
    }
  }

  // =============================================================
  // 2. CREATE (NOVO MÉTODO)
  // =============================================================
  async createCarona(dto: CreateCaronaDto): Promise<CaronaData> {
    // Usamos client.send para enviar o DTO completo.
    const resultObservable = this.caronasClient.send<CaronaData>(
      { cmd: 'caronas.create' },
      dto, // O DTO é o payload da mensagem TCP
    );

    // Converte o Observable de volta para Promise
    return firstValueFrom(resultObservable);
  }

  // =============================================================
  // 3. READ ONE (NOVO MÉTODO)
  // =============================================================
  async findOneCarona(id: number): Promise<CaronaData> {
    // Envia o comando 'caronas.findOne' com o ID como payload
    const resultObservable = this.caronasClient.send<CaronaData>(
      { cmd: 'caronas.findOne' },
      id,
    );
    return firstValueFrom(resultObservable);
  }

  // =============================================================
  // 4. DELETE (NOVO MÉTODO)
  // =============================================================
  async removeCarona(id: number): Promise<void> {
    // Envia o comando 'caronas.remove' com o ID.
    // O retorno pode ser vazio (void) ou um objeto de confirmação.
    const resultObservable = this.caronasClient.send<void>(
      { cmd: 'caronas.remove' },
      id,
    );
    return firstValueFrom(resultObservable);
  }
}
