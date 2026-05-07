async function traduzirTexto(texto) {

  const url =
  `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(texto)}`;

  const resposta =
  await fetch(url);

  const dados =
  await resposta.json();

  return dados[0]
  .map(item => item[0])
  .join("");
}

async function buscarBiomedicina() {

  try {

    // BUSCA ARTIGOS

    const buscaUrl =
    "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=biomedicine&retmode=json&retmax=8&sort=date";

    const respostaBusca =
    await fetch(buscaUrl);

    const dadosBusca =
    await respostaBusca.json();

    const ids =
    dadosBusca.esearchresult.idlist.join(",");

    // DETALHES

    const detalhesUrl =
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids}&retmode=json`;

    const respostaDetalhes =
    await fetch(detalhesUrl);

    const dadosDetalhes =
    await respostaDetalhes.json();

    let html = "";

    // LOOP

    for (const id of dadosBusca.esearchresult.idlist) {

      const artigo =
      dadosDetalhes.result[id];

      // TRADUZIR TITULO

      const tituloTraduzido =
      await traduzirTexto(artigo.title);

      html += `

        <div class="biomed-card">

          <div class="biomed-conteudo">

            <h2>

              🧬 ${tituloTraduzido}

            </h2>

            <p>

              📅 Publicado em:
              ${artigo.pubdate}

            </p>

            <p>

              👨‍🔬 Autor:
              ${artigo.authors[0]?.name || "Não informado"}

            </p>

            <a
              href="https://pubmed.ncbi.nlm.nih.gov/${id}/"
              target="_blank">

              Ler pesquisa completa

            </a>

          </div>

        </div>

      `;
    }

    document.getElementById("biomedNoticias")
    .innerHTML = html;

  }

  catch (erro) {

    console.log(erro);

    document.getElementById("biomedNoticias")
    .innerHTML = `

      <h2>

        Erro ao carregar pesquisas 😢

      </h2>

    `;
  }

}

buscarBiomedicina();