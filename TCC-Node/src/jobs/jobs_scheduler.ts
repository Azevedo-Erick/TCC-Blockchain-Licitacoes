import cron from 'node-cron';
import { LicitacaoConcorrenciaSelecaoMenorPrecoService } from '../app/services/licitacao_concorrencia_selecao_menor_preco';
import { inject, injectable } from 'inversify';

@injectable()
export class JobsScheduler {
    private readonly licitacaoConcorrenciaSelecaoMenorPrecoService: LicitacaoConcorrenciaSelecaoMenorPrecoService;

    constructor(
        @inject(LicitacaoConcorrenciaSelecaoMenorPrecoService)
        licitacaoConcorrenciaSelecaoMenorPrecoService: LicitacaoConcorrenciaSelecaoMenorPrecoService
    ) {
        this.licitacaoConcorrenciaSelecaoMenorPrecoService =
            licitacaoConcorrenciaSelecaoMenorPrecoService;
    }

    public start() {
        cron.schedule(
            '*/2 * * * * *',
            this.licitacaoConcorrenciaSelecaoMenorPrecoService
                .atualizarSituacoes
        );
    }
}
