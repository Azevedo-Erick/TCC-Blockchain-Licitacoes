using Nethereum.ABI.FunctionEncoding.Attributes;

namespace TCC_Blockchain.Providers.SmartContracts.Dtos.Events; 

[Event("CandidaturaEnviada")]
public class CandidaturaEnviadaEventDTO
{
    [Parameter("address", "candidato", 1, false)]
    public string Candidato { get; set; }

    [Parameter("bytes32", "hashCandidatura", 2, false)]
    public byte[] HashCandidatura { get; set; }

    [Parameter("uint256", "timestamp", 3, false)]
    public ulong Timestamp { get; set; }
}
