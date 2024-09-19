using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

namespace TCC_Blockchain.Providers.SmartContracts.Dtos.Outputs;

[Function("getEstagio", "uint8")]
public class GetEstagioFunction : FunctionMessage
{
    [Parameter("uint8", "", 1)]
    public byte Estagio { get; set; }
}
