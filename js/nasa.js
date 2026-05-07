async function traduzirTexto(texto) {

  const url =
  `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(texto)}`;

  const resposta = await fetch(url);

  const dados = await resposta.json();

  return dados[0].map(item => item[0]).join("");
}

async function buscarNASA() {

  const url =
  "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

  const resposta = await fetch(url);

  const dados = await resposta.json();

  // TRADUZIR

  const tituloTraduzido =
  await traduzirTexto(dados.title);

  const textoTraduzido =
  await traduzirTexto(dados.explanation);

  document.getElementById("resultado").innerHTML = `

    <h2>${tituloTraduzido}</h2>

    <img src="${dados.url}">

    <p>${textoTraduzido}</p>

  `;
}

buscarNASA();