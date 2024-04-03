using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using TCC_Blockchain.Providers.SmartContracts;
using TCC_Blockchain.Providers.SmartContracts.Outputs;

namespace TCC_Blockchain.Providers;

public class LeilaoSmartcontractProvider
{
    private readonly Web3 Web3Client;
    private readonly Account Account;
    private readonly ISmartContractData _smartContractData;

    public LeilaoSmartcontractProvider(Web3 web3Client, Account account, ISmartContractData smartContractProperties)
    {
        Web3Client = web3Client;
        Account = account;
        _smartContractData = smartContractProperties;
    }

    public async Task<string> DeployContractAsync()
    {
      
        var abi =  _smartContractData.GetContractAbi();
        var byteCode = _smartContractData.GetByteCode();
        var gas = new HexBigInteger(3000000);
        var constructorParameters = new object[] { };

        Web3Client.TransactionManager.UseLegacyAsDefault = true;

        var receipt = await Web3Client.Eth.DeployContract.SendRequestAndWaitForReceiptAsync(abi, byteCode, Account.Address, gas);
        return receipt.ContractAddress;
    }

    public async Task<string> CadastrarDonoEItem(string dono, string item, string contratoEndereco)
    {
        var contract = Web3Client.Eth.GetContract( _smartContractData.GetContractAbi(), contratoEndereco);
        
        var transferFunction = contract.GetFunction("cadastrarDonoEItem");
        Web3Client.TransactionManager.UseLegacyAsDefault = true;

        var gas = await transferFunction.EstimateGasAsync(this.Account.Address, null, null, dono, item);
        
        var receiptAmountSend =
            await transferFunction.SendTransactionAndWaitForReceiptAsync(this.Account.Address, gas, null, null,dono, item);
        return receiptAmountSend.BlockHash;
    }

    public async Task<string> BuscarDados(string contratoEndereco)
    {
        var contract = Web3Client.Eth.GetContract( _smartContractData.GetContractAbi(), contratoEndereco);
        
        var transferFunction = contract.GetFunction("obterDadosLeilao");
        var balance = await transferFunction.CallDeserializingToObjectAsync<DadosLeilaoOutputDTO>();
        Console.WriteLine($"Estado: {balance.Estado}");
        Console.WriteLine($"Dono: {balance.Dono}");
        Console.WriteLine($"Item: {balance.Item}");
        Console.WriteLine($"Lance Mais Alto: {balance.LanceMaisAlto}");
        Console.WriteLine($"Maior Licitante: {balance.MaiorLicitante}");
        return "";
    }
}