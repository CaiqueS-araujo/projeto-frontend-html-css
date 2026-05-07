async function converter() {

  const valor =
  document.getElementById("valor").value;

  const url =
  "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL";

  const resposta = await fetch(url);

  const dados = await resposta.json();

  const dolar =
  (valor / dados.USDBRL.bid).toFixed(2);

  const euro =
  (valor / dados.EURBRL.bid).toFixed(2);

  document.getElementById("resultado").innerHTML = `

    <h2>Conversão</h2>

    <p>💵 Dólar: $${dolar}</p>

    <p>💶 Euro: €${euro}</p>

  `;
}