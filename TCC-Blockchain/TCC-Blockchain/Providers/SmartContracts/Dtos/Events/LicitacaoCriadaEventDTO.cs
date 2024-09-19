using Nethereum.ABI.FunctionEncoding.Attributes;

namespace TCC_Blockchain.Providers.SmartContracts.Dtos.Events;

[Event("LicitacaoCriada")]
public class LicitacaoCriadaEventDTO
{
    [Parameter("string", "titulo", 1, false)]
    public string Titulo { get; set; }

    [Parameter("string", "descricao", 2, false)]
    public string Descricao { get; set; }

    [Parameter("bytes32", "hashETP", 3, false)]
    public byte[] HashETP { get; set; }

    [Parameter("bytes32", "hashEdital", 4, false)]
    public byte[] HashEdital { get; set; }

    [Parameter("uint256", "dataInicio", 5, false)]
    public ulong DataInicio { get; set; }
}
