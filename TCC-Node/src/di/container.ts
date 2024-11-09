import { Container } from 'inversify';
import { StorageLicitacoesService } from '../app/services/storage_licitacoes_service';
import { JobsScheduler } from '../jobs/jobs_scheduler';
import { LicitacaoConcorrenciaSelecaoMenorPrecoService } from '../app/services/licitacao_concorrencia_selecao_menor_preco';
import { Web3Provider } from '../app/providers/web3_provider';
import { PrismaClientProvider } from '../app/providers/prisma_client_provider';

const web3Instance: Web3Provider = new Web3Provider();

const container = new Container();
container.bind(Web3Provider).toConstantValue(web3Instance);
container.bind(PrismaClientProvider).toSelf();

container.bind(StorageLicitacoesService).toSelf();
container.bind(LicitacaoConcorrenciaSelecaoMenorPrecoService).toSelf();
container.bind(JobsScheduler).toSelf();

export default container;
