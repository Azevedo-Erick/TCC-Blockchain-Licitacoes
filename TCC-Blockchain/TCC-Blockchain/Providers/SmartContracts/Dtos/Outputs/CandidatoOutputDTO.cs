using Nethereum.ABI.FunctionEncoding.Attributes;

namespace TCC_Blockchain.Providers.SmartContracts.Dtos.Outputs;

[FunctionOutput]
public class CandidatoOutputDTO
{
    [Parameter("address", "endereco", 1)]
    public string Endereco { get; set; }

    [Parameter("bytes32", "hashCandidatura", 2)]
    public byte[] HashCandidatura { get; set; }

    [Parameter("uint256", "timestampEnvio", 3)]
    public ulong TimestampEnvio { get; set; }
}
