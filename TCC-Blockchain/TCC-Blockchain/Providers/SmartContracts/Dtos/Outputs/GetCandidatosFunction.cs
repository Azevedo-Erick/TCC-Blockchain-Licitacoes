using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

namespace TCC_Blockchain.Providers.SmartContracts.Dtos.Outputs;

[Function("getCandidatos", "address[]")]
public class GetCandidatosFunction : FunctionMessage
{
    
}
