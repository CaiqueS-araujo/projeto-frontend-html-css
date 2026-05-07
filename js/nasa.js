async function traduzirTexto(texto) {

  try {

    const url =
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(texto)}`;

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro na tradução");
    }

    const dados = await resposta.json();

    return dados[0].map(item => item[0]).join("");

  } catch (erro) {

    console.log("Erro ao traduzir:", erro);

    // retorna texto original
    return texto;
  }
}

async function buscarNASA() {

  try {

    const url =
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro API NASA");
    }

    const dados = await resposta.json();

    const tituloTraduzido =
      await traduzirTexto(dados.title);

    const textoTraduzido =
      await traduzirTexto(dados.explanation);

    document.getElementById("resultado").innerHTML = `

      <h2>${tituloTraduzido}</h2>

      <img src="${dados.url}" alt="Imagem NASA">

      <p>${textoTraduzido}</p>

    `;

  } catch (erro) {

    console.log("Erro NASA:", erro);

    document.getElementById("resultado").innerHTML = `
      <p>Erro ao carregar conteúdo da NASA.</p>
    `;
  }
}

buscarNASA();