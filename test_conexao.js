const Parse = require("parse/node");

// 1. Inicializa o SDK com as suas chaves corretas do Back4App
Parse.initialize(
  "UtvEQJs7CunvfkxzP3yPlX4jbqZxA8Kej3vFRGF8", // O SEU APPLICATION ID REAL (estava invertido no seu código!)
  "COLOQUE_SUA_JAVASCRIPT_KEY_AQUI"           // A SUA JAVASCRIPT KEY (não a Client Key ou REST API Key)
);

// 2. O endpoint correto da API do Parse no Back4App
Parse.serverURL = "https://parseapi.back4app.com";

// Código que faz o teste de salvamento no banco de dados
const Teste = Parse.Object.extend("ConexaoTeste");
const meuTeste = new Teste();
meuTeste.set("status", "Online");

console.log("Tentando salvar objeto de teste no Back4App via SDK...");
meuTeste.save()
  .then(() => console.log("✅ CONECTADO COM SUCESSO VIA SDK!"))
  .catch(e => {
    console.log("❌ ERRO:", e.message);
    console.log("\nDica: Para o SDK funcionar, certifique-se de usar a 'JavaScript Key' gerada no painel do Back4App.");
  });
