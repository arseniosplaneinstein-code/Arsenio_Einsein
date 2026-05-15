// ===============================
// FORMATAR MOEDA
// ===============================

function formatarMoeda(valor){

  return valor.toLocaleString(
    "pt-PT",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  ) + " Kz";
}

// ===============================
// ADICIONAR SUBSÍDIO
// ===============================

function adicionarLinha(){

  const nome = prompt(
    "Digite o nome do subsídio:"
  );

  if(!nome || nome.trim() === ""){
    return;
  }

  const area =
    document.getElementById(
      "areaSubsidi"
    );

  const novaLinha =
    document.createElement("div");

  novaLinha.className = "form-row";

  novaLinha.innerHTML = `

    <label>${nome} (Kz)</label>

    <input
      type="number"
      name="subsidi_valor[]"
      placeholder="Ex: 5000"
      min="0"
    >

    <button
      type="button"
      class="btn-remover"
    >
      <i class="fa-solid fa-trash"></i>
    </button>

  `;

  // REMOVER

  const botaoRemover =
    novaLinha.querySelector(
      ".btn-remover"
    );

  botaoRemover.addEventListener(
    "click",
    () => {

      novaLinha.remove();

    }
  );

  area.appendChild(novaLinha);
}

// ===============================
// TABELA IRT ANGOLA
// ===============================

const irtTabela = [

  {
    min:0,
    max:100000,
    pf:0,
    ex:0,
    taxa:0.00
  },

  {
    min:100001,
    max:150000,
    pf:0,
    ex:100000,
    taxa:0.13
  },

  {
    min:150001,
    max:200000,
    pf:6500,
    ex:150000,
    taxa:0.16
  },

  {
    min:200001,
    max:300000,
    pf:14500,
    ex:200000,
    taxa:0.18
  },

  {
    min:300001,
    max:500000,
    pf:32500,
    ex:300000,
    taxa:0.19
  },

  {
    min:500001,
    max:1000000,
    pf:70500,
    ex:500000,
    taxa:0.20
  },

  {
    min:1000001,
    max:1500000,
    pf:170500,
    ex:1000000,
    taxa:0.21
  },

  {
    min:1500001,
    max:2000000,
    pf:275500,
    ex:1500000,
    taxa:0.22
  },

  {
    min:2000001,
    max:2500000,
    pf:385500,
    ex:2000000,
    taxa:0.23
  },

  {
    min:2500001,
    max:5000000,
    pf:500500,
    ex:2500000,
    taxa:0.24
  },

  {
    min:5000001,
    max:10000000,
    pf:1100500,
    ex:5000000,
    taxa:0.245
  },

  {
    min:10000001,
    max:Number.MAX_SAFE_INTEGER,
    pf:2325500,
    ex:10000000,
    taxa:0.25
  }

];

// ===============================
// CALCULAR IRT
// ===============================

function calcularIRT(materiaColetavel){

  for(const esc of irtTabela){

    if(
      materiaColetavel >= esc.min &&
      materiaColetavel <= esc.max
    ){

      return (
        esc.pf +
        (
          materiaColetavel - esc.ex
        ) * esc.taxa
      );
    }
  }

  return 0;
}

// ===============================
// CALCULAR SALÁRIO
// ===============================

function calcular(){

  // SALÁRIO BASE

  const salBase =
    Number(
      document.getElementById(
        "inp_salbase"
      ).value
    ) || 0;

  // SUBSÍDIOS

  const subTrans =
    Number(
      document.getElementById(
        "inp_sub_trans"
      ).value
    ) || 0;

  const subAlim =
    Number(
      document.getElementById(
        "inp_sub_alim"
      ).value
    ) || 0;

  // SUBSÍDIOS TRIBUTÁVEIS

  const subTransTrib =
    subTrans > 30000
    ? subTrans - 30000
    : 0;

  const subAlimTrib =
    subAlim > 30000
    ? subAlim - 30000
    : 0;

  // SUBSÍDIOS ADICIONAIS

  const subsidiosExtras =
    document.getElementsByName(
      "subsidi_valor[]"
    );

  let totalExtras = 0;

  for(const item of subsidiosExtras){

    totalExtras +=
      Number(item.value) || 0;
  }

  // SALÁRIO BRUTO

  const salarioBruto =
    salBase +
    subTrans +
    subAlim +
    totalExtras;

  // INSS

  const inss =
    salBase * 0.03;

  // MATÉRIA COLETÁVEL

  const materiaColetavel =
    (
      salBase - inss
    ) +
    subTransTrib +
    subAlimTrib +
    totalExtras;

  // IRT

  const irt =
    calcularIRT(
      materiaColetavel
    );

  // SALÁRIO LÍQUIDO

  const salarioLiquido =
    salarioBruto -
    (
      inss + irt
    );

  // RESULTADOS

  document.getElementById(
    "td_salbruto"
  ).innerText =
    formatarMoeda(
      salarioBruto
    );

  document.getElementById(
    "td_inss"
  ).innerText =
    formatarMoeda(
      inss
    );

  document.getElementById(
    "td_irt"
  ).innerText =
    formatarMoeda(
      irt
    );

  document.getElementById(
    "sal_liquido"
  ).innerText =
    formatarMoeda(
      salarioLiquido
    );
}

// ===============================
// LIMPAR
// ===============================

function limpar(){

  // INPUTS

  document.getElementById(
    "inp_salbase"
  ).value = "";

  document.getElementById(
    "inp_sub_trans"
  ).value = "";

  document.getElementById(
    "inp_sub_alim"
  ).value = "";

  // SUBSÍDIOS

  document.getElementById(
    "areaSubsidi"
  ).innerHTML = "";

  // RESULTADOS

  document.getElementById(
    "td_salbruto"
  ).innerText = "-";

  document.getElementById(
    "td_inss"
  ).innerText = "-";

  document.getElementById(
    "td_irt"
  ).innerText = "-";

  document.getElementById(
    "sal_liquido"
  ).innerText = "-";
}