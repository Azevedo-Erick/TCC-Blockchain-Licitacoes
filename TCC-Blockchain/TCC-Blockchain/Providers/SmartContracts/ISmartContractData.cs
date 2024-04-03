namespace TCC_Blockchain.Providers.SmartContracts;

public interface ISmartContractData
{
    public string GetContractAbi();
    public string GetByteCode();
}