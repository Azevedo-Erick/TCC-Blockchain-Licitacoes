using Nethereum.ABI.FunctionEncoding.Attributes;

namespace TCC_Blockchain.Providers.SmartContracts.Outputs;

[FunctionOutput]
public class DadosLeilaoOutputDTO
{
    [Parameter("uint256", "estado", 1)]
    public int Estado { get; set; }
    
    [Parameter("string", "dono", 2)]
    public string Dono { get; set; }

    [Parameter("string", "item", 3)]
    public string Item { get; set; }

    [Parameter("uint256", "lanceMaisAlto", 4)]
    public ulong LanceMaisAlto { get; set; }

    [Parameter("string", "maiorLicitante", 5)]
    public string MaiorLicitante { get; set; }
}