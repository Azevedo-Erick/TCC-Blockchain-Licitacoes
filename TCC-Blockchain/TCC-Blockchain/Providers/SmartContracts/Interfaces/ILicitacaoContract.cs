namespace TCC_Blockchain.Providers.SmartContracts.Interfaces;

public interface ILicitacaoContract
{
    //Task<DadosLeilaoOutputDTO> GetDadosLeilaoAsync();
    Task CriarLicitacaoAsync(string titulo, string descricao, byte[] hashETP, byte[] hashEdital, ulong dataInicio);
    Task EnviarCandidaturaAsync(byte[] hashCandidatura);
}
