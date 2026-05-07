async function buscarNoticias() {

  const apiKey = "9243b04a89842cd1e3c4bd0128983677";

  const url =
  `https://gnews.io/api/v4/top-headlines?country=br&lang=pt&max=10&apikey=${apiKey}`;

  const resposta = await fetch(url);

  const dados = await resposta.json();

  console.log(dados);

  let html = "";

  dados.articles.forEach((noticia) => {

    html += `

      <div class="noticia">

        <img
          src="${noticia.image}"
          alt="Imagem notícia">

        <h2>
          ${noticia.title}
        </h2>

        <p>
          ${noticia.description || ""}
        </p>

        <a href="${noticia.url}"
           target="_blank">

          Ler notícia completa

        </a>

      </div>

    `;
  });

  document.getElementById("noticias")
  .innerHTML = html;
}

buscarNoticias();