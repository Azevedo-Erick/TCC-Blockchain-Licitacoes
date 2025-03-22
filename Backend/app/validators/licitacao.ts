import vine from '@vinejs/vine'

export const createLicitacaoValidator = vine.compile(
    vine.object({
        tituloLicitacao: vine.string().trim().minLength(6),
        descricaoLicitacao: vine.string().trim(),
        dataInicio: vine.date(
            {
                formats: ['iso8601']
            }
        ),
        dataInicioCandidaturas: vine.date(
            {
                formats: ['iso8601']
            }
        ),
        dataFimCandidaturas: vine.date(
            {
                formats: ['iso8601']
            }
        ),
        etp: vine.file({ size: '10mb' }),
        edital: vine.file({ size: '10mb' }),
    })
)
