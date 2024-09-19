using Nethereum.ABI.FunctionEncoding.Attributes;

namespace TCC_Blockchain.Providers.SmartContracts.Dtos.Events; 

[Event("EstagioAtualizado")]
public class EstagioAtualizadoEventDTO
{
   [Parameter("uint8", "novoEstagio", 1, false)]
    public byte NovoEstagio { get; set; }

    [Parameter("uint256", "timestamp", 2, false)]
    public ulong Timestamp { get; set; }
}
