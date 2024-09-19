using Nethereum.Contracts;

namespace TCC_Blockchain.Providers.SmartContracts.Deployments;

public class LicitacaoConcorrenciaSelecaoMenorPrecoContractDeployment : ContractDeploymentMessage
{
    public LicitacaoConcorrenciaSelecaoMenorPrecoContractDeployment(string name, string bytecode) : base(bytecode)
    {
        Name = name;
        Bytecode = bytecode;
    }

       public LicitacaoConcorrenciaSelecaoMenorPrecoContractDeployment(string name) : base(Bytecode)
    {
        Name = name;
    }


    public string Name { get; set; }
    public static string  Bytecode { get; set; } = File.ReadAllText("Providers/SmartContracts/Bytecodes/LicitacaoConcorrenciaSelecaoMenorPrecoContract.txt");


}
