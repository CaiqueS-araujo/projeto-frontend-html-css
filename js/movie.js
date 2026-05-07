async function buscarFilmes() {

  const url =
  "https://api.tvmaze.com/shows";

  const resposta = await fetch(url);

  const dados = await resposta.json();

  let html = "";

  dados.slice(0, 6).forEach((filme) => {

    html += `

      <div class="filme">

        <img src="${filme.image.medium}">

        <h3>${filme.name}</h3>

      </div>

    `;
  });

  document.getElementById("filmes").innerHTML = html;
}

buscarFilmes();