using Ipfs.Http;

namespace TCC_Blockchain.Providers.Ipfs;

public class IpfsProvider
{
    private readonly IpfsClient _ipfsClient;

    public IpfsProvider(string ipfsApiUrl = "http://localhost:5001")
    {
        _ipfsClient = new IpfsClient(ipfsApiUrl);
    }

    public async Task<string> AddFileAsync(IFormFile file)
    {
        try
        {
            using var stream = file.OpenReadStream();
            var fileNode = await _ipfsClient.FileSystem.AddAsync(stream, Guid.NewGuid().ToString());
            return fileNode.Id;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao enviar arquivo para o IPFS: {ex.Message}");
            throw; 
        }
    }
}