var adicionarBotao = document.querySelector("#adicionar-paciente");
adicionarBotao.addEventListener("click", function (event) {
  event.preventDefault();
  var form = document.querySelector("#form-adiciona");
  //obtem os dados do paciente
  var paciente = obtemDadosDoForm(form);

  var erros = validaPaciente(paciente);
  console.log(erros);
  if (erros.length > 0) {
    exibeMensagensDeError(erros);
    return;
  }

  //adiciona o paciente na tabela

  adicionaPaciente(paciente);

  form.reset();

  var mensagemDeError = document.querySelector("#messagens-error");
  mensagemDeError.innerHTML = "";
});

function adicionaPaciente(paciente) {
  var pacienteTr = montaTr(paciente);
  var tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(pacienteTr);
}

function exibeMensagensDeError(erros) {
  var ul = document.querySelector("#messagens-error");
  ul.innerHTML = "";
  erros.forEach(function (erro) {
    var li = document.createElement("li");
    li.textContent = erro;
    ul.appendChild(li);
  });
}

function obtemDadosDoForm(form) {
  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value),
  };

  return paciente;
}

function montaTr(paciente) {
  var pacienteTr = document.createElement("tr");
  pacienteTr.classList.add("paciente");

  pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
  pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

  return pacienteTr;
}

function montaTd(dado, classe) {
  var td = document.createElement("td");
  td.textContent = dado;
  td.classList.add(classe);
  return td;
}

function validaPaciente(paciente) {
  var erros = [];

  if (paciente.nome.length == 0) erros.push("Nome não foi preenchido!");
  if (!validaPeso(paciente.peso)) erros.push("O peso é Invalido!");
  if (!validaAltura(paciente.altura)) erros.push("A Altura É Invalida!");
  if (paciente.gordura.length == 0)
    erros.push("Taxa de gordura não informada!");
  if (paciente.peso.length == 0) erros.push("Peso não informado!");
  if (paciente.altura.length == 0) erros.push("Altura não informada!");

  return erros;
}
