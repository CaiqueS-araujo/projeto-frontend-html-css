const apiKey = "666d6882fa9d42e48cc04847260705";

async function buscarClima() {

  navigator.geolocation.getCurrentPosition(

    async (posicao) => {

      const latitude =
      posicao.coords.latitude;

      const longitude =
      posicao.coords.longitude;

      const url =
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=5&lang=pt`;

      const resposta =
      await fetch(url);

      const dados =
      await resposta.json();

      console.log(dados);

      // PREVISÃO

      let previsaoHTML = "";

      dados.forecast.forecastday.forEach((dia) => {

        previsaoHTML += `

          <div class="dia-card">

            <h3>

              ${formatarData(dia.date)}

            </h3>

            <img
              src="${dia.day.condition.icon}">

            <p>

              ${dia.day.condition.text}

            </p>

            <h2>

              ${dia.day.avgtemp_c}°C

            </h2>

          </div>

        `;
      });

      // RESULTADO

      document.getElementById("resultado")
      .innerHTML = `

        <div class="clima-atual">

          <h2>

            📍 ${dados.location.name}

          </h2>

          <img
            class="icone-clima"
            src="${dados.current.condition.icon}">

          <h1 class="temperatura">

            ${dados.current.temp_c}°C

          </h1>

          <p class="descricao">

            ${dados.current.condition.text}

          </p>

          <div class="info-grid">

            <div class="info-box">

              💨
              <p>Vento</p>

              <h3>
                ${dados.current.wind_kph} km/h
              </h3>

            </div>

            <div class="info-box">

              💧
              <p>Umidade</p>

              <h3>
                ${dados.current.humidity}%
              </h3>

            </div>

            <div class="info-box">

              🌡️
              <p>Sensação</p>

              <h3>
                ${dados.current.feelslike_c}°C
              </h3>

            </div>

          </div>

        </div>

        <h2 class="titulo-previsao">

          Próximos dias

        </h2>

        <div class="previsao-grid">

          ${previsaoHTML}

        </div>

      `;
    },

    (erro) => {

      document.getElementById("resultado")
      .innerHTML = `

        <h2>

          Erro ao obter localização 😢

        </h2>

      `;

      console.log(erro);

    }

  );

}

// FORMATAR DATA

function formatarData(data) {

  const novaData = new Date(data);

  return novaData.toLocaleDateString(

    "pt-BR",

    {

      weekday: "short",

      day: "2-digit",

      month: "2-digit"

    }

  );
}

// INICIAR

buscarClima();