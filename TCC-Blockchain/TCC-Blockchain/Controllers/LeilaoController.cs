using Microsoft.AspNetCore.Mvc;
using Nethereum.Web3;
using TCC_Blockchain.Conf;
using TCC_Blockchain.Providers;
using TCC_Blockchain.Providers.SmartContracts;
using Nethereum.Web3.Accounts;
using TCC_Blockchain.Dtos;
using TCC_Blockchain.Providers.Ipfs;
using TCC_Blockchain.Providers.SmartContracts.Services;
using Nethereum.Signer;
using Nethereum.Hex.HexConvertors.Extensions;

namespace TCC_Blockchain.Controllers;

[ApiController]
[Route("[controller]")]
public class LeilaoController : ControllerBase
{
    public readonly LicitacaoContractService _provider;

    public LeilaoController(LicitacaoContractService provider)
    {
        _provider = provider;
    }

    [HttpPost("novo")]
    public async Task<IActionResult> Get([FromForm] CriarLicitacaoDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var ipfs = new IpfsProvider();
        var hashEdital = await ipfs.AddFileAsync(dto.Edital);
        var hashEtp = await ipfs.AddFileAsync(dto.ETP);
    
        
        ulong dataInicioTimestamp = (ulong)new DateTimeOffset(dto.DataInicio).ToUnixTimeSeconds();
        var hash = await _provider.DeployContractAsync();
        await _provider.CriarLicitacaoAsync(
            hash,
            dto.Titulo,
            dto.Descricao,
            hashEtp,
            hashEdital,
            dataInicioTimestamp
            );
        return Ok(hash);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] string contratoEndereco)
    {
        var hash = await _provider.BuscarDadosAsync(contratoEndereco);
        return Ok(hash);
    }

    [HttpGet]
    public async Task<IActionResult> GerarParDeChaves()
    {
        var ecKey = EthECKey.GenerateKey();

        // Obter a chave privada
        var privateKey = ecKey.GetPrivateKeyAsBytes().ToHex();
        // Obter a chave pública
        var publicKey = ecKey.GetPubKey().ToHex();
        // Derivar o endereço da conta
        var address = ecKey.GetPublicAddress();

        return Ok(new {address=address, privateKey=privateKey, publicKey=publicKey});
    }
    /* [HttpPost]
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

    [HttpPost("to-ipfs")]
    public async Task<IActionResult> SendToIpfs([FromForm] FileUpload file)
    {
        var ipfs = new IpfsProvider();
        return Ok(await ipfs.AddFileAsync(file.File));
    } */
}