using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

namespace TCC_Blockchain.Providers.SmartContracts.Dtos.Functions;

[Function("criarLicitacao")]
public class CriarLicitacaoFunction : FunctionMessage
{
    [Parameter("string", "_titulo", 1)]
    public string Titulo { get; set; }

    [Parameter("string", "_descricao", 2)]
    public string Descricao { get; set; }

    [Parameter("bytes32", "_hashETP", 3)]
    public byte[] HashETP { get; set; }

    [Parameter("bytes32", "_hashEdital", 4)]
    public byte[] HashEdital { get; set; }

    [Parameter("uint256", "_dataInicio", 5)]
    public ulong DataInicio { get; set; }
}
