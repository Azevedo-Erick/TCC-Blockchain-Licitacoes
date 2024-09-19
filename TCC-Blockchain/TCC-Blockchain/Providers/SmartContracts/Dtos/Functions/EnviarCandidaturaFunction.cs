using Nethereum.ABI.FunctionEncoding.Attributes;

namespace TCC_Blockchain.Providers.SmartContracts.Dtos.Functions;

[Function("enviarCandidatura")]
public class EnviarCandidaturaFunction
{
    [Parameter("bytes32", "_hashCandidatura", 1)]
    public byte[] HashCandidatura { get; set; }
}
