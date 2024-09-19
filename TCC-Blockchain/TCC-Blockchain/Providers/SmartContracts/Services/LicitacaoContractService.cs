using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;
using Nethereum.Web3.Accounts;
using Nethereum.Web3;
using TCC_Blockchain.Providers.SmartContracts.Deployments;
using TCC_Blockchain.Providers.SmartContracts.Dtos.Outputs;
using TCC_Blockchain.Providers.SmartContracts.Dtos.Functions;

namespace TCC_Blockchain.Providers.SmartContracts.Services;

public class LicitacaoContractService
{
    private readonly Web3 _web3;
    private readonly Account Account;

    private readonly Contract _contract;

    public LicitacaoContractService(Web3 web3, Account account, string contractAddress)
    {
        _web3 = web3;
        _contract = _web3.Eth.GetContract(Abi, contractAddress);
        Account = account;
    }
    public LicitacaoContractService(Web3 web3, Account account)
    {
        _web3 = web3;
        Account = account;
    }


    public async Task<LicitacaoOutputDTO> GetDadosLeilaoAsync()
    {
        var function = _contract.GetFunction("dadosLeilao");
        return await function.CallDeserializingToObjectAsync<LicitacaoOutputDTO>();
    }

    public async Task<string> DeployContractAsync()
    {

        var gas = new HexBigInteger(3000000);

        _web3.TransactionManager.UseLegacyAsDefault = true;

        var receipt = await _web3.Eth.DeployContract.SendRequestAndWaitForReceiptAsync(Abi, LicitacaoConcorrenciaSelecaoMenorPrecoContractDeployment.Bytecode, this.Account.Address, gas);
        return receipt.ContractAddress;
    }

    public async Task<string> CriarLicitacaoAsync(string enderecoContrato, string titulo, string descricao, string hashETP, string hashEdital, ulong dataInicio)
    {
        var contract = _web3.Eth.GetContract(Abi, enderecoContrato);

        var function = contract.GetFunction("criarLicitacao");


        _web3.TransactionManager.UseLegacyAsDefault = true;

        var gas = await function.EstimateGasAsync(Account.Address, null, null,
        titulo,
descricao,
hashETP,
hashEdital,
dataInicio
        );

        var transactionInput = await function.SendTransactionAndWaitForReceiptAsync(
            Account.Address, gas,
            null,
            null,
            titulo,
descricao,
hashETP,
hashEdital,
dataInicio
        );

        var transactionHash = transactionInput.BlockHash;
        return transactionHash;
    }

    public async Task<string> BuscarDadosAsync(string contratoEndereco)
    {
        try
        {
            // Verifica se o endereço do contrato é válido
            if (string.IsNullOrWhiteSpace(contratoEndereco) || contratoEndereco.Length != 42)
            {
                throw new ArgumentException("Endereço do contrato inválido.");
            }

            var contract = _web3.Eth.GetContract(Abi, contratoEndereco);

            var transferFunction = contract.GetFunction("licitacao");

            // Faz a chamada para obter os dados
            var data = await transferFunction.CallDeserializingToObjectAsync<LicitacaoOutputDTO>();

            // Exibe os dados
            Console.WriteLine($"Título: {data.Titulo}");
            Console.WriteLine($"Estágio: {data.Estagio}");
            Console.WriteLine($"Descrição: {data.Descricao}");
            Console.WriteLine($"Data Início: {data.DataInicio}");
            Console.WriteLine($"Data Início: {data.HashEdital.ToString()}");
            Console.WriteLine($"Data Início: {data.HashETP.ToString()}");


            return "Dados obtidos com sucesso. ";
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao buscar dados: {ex.Message}");
            return "Erro ao buscar dados.";
        }
    }

    private string Abi => File.ReadAllText("Providers/SmartContracts/Abis/LicitacaoConcorrenciaSelecaoMenorPrecoContractDataAbi.json");

}
