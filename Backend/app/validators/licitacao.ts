import vine from '@vinejs/vine'

export const createLicitacaoValidator = vine.compile(
    vine.object({
        tituloLicitacao: vine.string().trim().minLength(6),
        descricaoLicitacao: vine.string().trim(),
        dataInicio: vine.date(),
        dataInicioCandidaturas: vine.date(),
        dataFimCandidaturas: vine.date(),
    })
)
