const Parse = require("parse/node");

Parse.initialize(
  "KdYdm1xRplRU8GkSl6Eofxs2xR7yEQZ0LgxnrvBJ", 
  "4rTDARmM05VNbj48uCQh5fYsUypLjf0juZIHVQcj" // <-- Substitua apenas aqui dentro das aspas
);

// Mantenha esta linha exatamente assim:
Parse.serverURL = "4rTDARmM05VNbj48uCQh5fYsUypLjf0juZIHVQcj";

// Código de teste de envio
const T = Parse.Object.extend("ConexaoTeste");
const m = new T();
m.set("status", "Online");

m.save()
  .then(() => console.log("✅ CONECTADO COM SUCESSO!"))
  .catch(e => console.log("❌ ERRO:", e.message));
