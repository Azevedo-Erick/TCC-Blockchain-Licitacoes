
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using TCC_Blockchain.Conf;
using TCC_Blockchain.Controllers;
using TCC_Blockchain.Providers;
using TCC_Blockchain.Providers.SmartContracts;
using TCC_Blockchain.Providers.SmartContracts.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<LicitacaoContractService>(provider =>
{
    var privateKey = Configurations.privateKey;
    var url = Configurations.besuUrl;
    var account = new Account(privateKey);
    var web3 = new Web3(account, url);
    return new LicitacaoContractService(web3, account);
});

builder.Services.AddScoped<LeilaoController>();
builder.Services.AddControllers();
var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
   
  // app.UseAuthorization();
   app.UseCors(policyBuilder =>
   {
       policyBuilder.AllowAnyMethod()
           .AllowAnyHeader()
           .AllowAnyOrigin();
   });
   app.MapControllers();


app.Run();




