var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function () {
  console.log("Buscando Pacientes...");

  var xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "https://raw.githubusercontent.com/mmgcnerds/api-pacientes/main/api-pacientes.json"
  );

  xhr.addEventListener("load", function () {
    var erroAjax = document.querySelector("erro-ajax");

    if (xhr.status == 200) {
      var resposta = xhr.responseText;
      var pacientes = JSON.parse(resposta);

      pacientes.forEach(function (paciente) {
        adicionaPaciente(paciente);
      });
    } else {
      erroAjax.classList.remove("invisivel");
    }
  });

  xhr.send();
});
