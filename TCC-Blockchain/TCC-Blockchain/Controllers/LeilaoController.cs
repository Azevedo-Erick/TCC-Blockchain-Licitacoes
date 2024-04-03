using Microsoft.AspNetCore.Mvc;
using Nethereum.Web3;
using TCC_Blockchain.Conf;
using TCC_Blockchain.Providers;
using TCC_Blockchain.Providers.SmartContracts;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using TCC_Blockchain.Conf;
using TCC_Blockchain.Dtos;
using TCC_Blockchain.Providers;
using TCC_Blockchain.Providers.SmartContracts;


namespace TCC_Blockchain.Controllers;

[ApiController]
[Route("[controller]")]
public class LeilaoController : ControllerBase
{
    public readonly LeilaoSmartcontractProvider _provider;

    public LeilaoController(LeilaoSmartcontractProvider provider)
    {
        _provider = provider;
    }
    
    [HttpGet("novo")]
    public async Task<IActionResult> Get()
    {
        var hash = await _provider.DeployContractAsync();
        return  Ok(hash);
    }
    
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CadastrarDonoEItem data)
    {
        var hash = await _provider.CadastrarDonoEItem(data.dono, data.item,data.enderecoContrato);
        return  Ok(hash);
    }
    
    [HttpGet]
    public async Task<IActionResult> Find([FromQuery] string hash)
    {
        var data = await _provider.BuscarDados(hash);
        return  Ok(data);
    }
}