const axios = require('c:/Users/neris/Downloads/Front/node_modules/axios');

const api = axios.create({
  baseURL: "https://parseapi.back4app.com",
  headers: {
    "X-Parse-Application-Id": "UtvEQJs7CunvfkxzP3yPlX4jbqZxA8Kej3vFRGF8",
    "X-Parse-REST-API-Key": "KdYdm1xRplRU8GkSl6Eofxs2xR7yEQZ0LgxnrvBJ",
    "Content-Type": "application/json",
  },
});

async function run() {
  console.log("Tentando conectar ao Back4App via Axios...");
  try {
    const response = await api.post("/classes/ConexaoTeste", {
      status: "Online"
    });
    console.log("✅ CONECTADO COM SUCESSO via Axios!");
    console.log("Dados da resposta:", response.data);
  } catch (error) {
    if (error.response) {
      console.log("❌ ERRO:", error.response.data.error || error.response.statusText);
    } else {
      console.log("❌ ERRO:", error.message);
    }
  }
}

run();
