namespace TCC_Blockchain.Dtos; 

public class ResponseLicitacaoDto
{
    public string Titulo { get; set; }
    public string Descricao { get; set; }
    public string HashETP { get; set; }
    public string HashEdital { get; set; }
    public ulong DataInicio { get; set; }
    public byte Estagio { get; set; }

}
