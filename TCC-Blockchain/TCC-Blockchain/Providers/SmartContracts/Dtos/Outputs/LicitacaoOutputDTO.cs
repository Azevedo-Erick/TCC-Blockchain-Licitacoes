using Nethereum.ABI.FunctionEncoding.Attributes;

namespace TCC_Blockchain.Providers.SmartContracts.Dtos.Outputs;

[FunctionOutput]
public class LicitacaoOutputDTO
{
    [Parameter("string", "titulo", 1)]
    public string Titulo { get; set; }

    [Parameter("string", "descricao", 2)]
    public string Descricao { get; set; }

    [Parameter("string", "hashETP", 3)]
    public string HashETP { get; set; }

    [Parameter("string", "hashEdital", 4)]
    public string HashEdital { get; set; }

    [Parameter("uint256", "dataInicio", 5)]
    public ulong DataInicio { get; set; }

    [Parameter("uint8", "estagio", 6)]
    public byte Estagio { get; set; }
}
