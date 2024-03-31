const { Web3 } = require("web3");

// Conectar-se a um nó Ethereum
const web3 = new Web3("http://localhost:8545");


// Valor a ser enviado para a função setMeuNumero
const valor = 100; // Este é o número que você deseja enviar para o contrato

// Obter o bytecode da função setMeuNumero
const data = web3.eth.abi.encodeFunctionCall({
  name: "setMeuNumero",
  type: "function",
  inputs: [{ type: "uint", name: "_meuNumero" }]
}, [valor]);

// Definir os detalhes da transação
const transactionObject = {
  from: "0xc8cfdadacf6a05a70ead9746d44b096820710c4a", // Endereço remetente
  to:  "0x6541BabED84e2fd29B98E4d696FaBc0B054f251a", // Endereço do contrato
  gas: 2000000, // Limite de gás
  gasPrice: "0", // Preço do gás em Wei (opcional)
  value: "0", // Valor em Wei (opcional)
  data: data, // Dados da função codificados
};

// Assinar e enviar a transação
web3.eth.accounts
  .signTransaction(transactionObject, "0xd5cad825d7ea66b7d383f77806d14ad32a529744b753a6553930f22e24d1eb09")
  .then((signedTx) => {
    const rawTx = signedTx.rawTransaction;
    console.log("Transação assinada:", rawTx);

    // Enviar a transação assinada
    web3.eth
      .sendSignedTransaction(rawTx)
      .on("transactionHash", (hash) => {
        console.log("Hash da transação:", hash);
      })
      .on("receipt", (receipt) => {
        console.log("Recibo da transação:", receipt);
      })
      .on("error", (err) => {
        console.error("Erro ao enviar transação:", err);
      });
  })
  .catch((err) => {
    console.error("Erro ao assinar transação:", err);
  });