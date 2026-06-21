const logikoDePlurajValoroj = {
  valorojPorRedoni: {},
};

const operaciajKodoj = [
  /* indekso, bajtkodo
  /* 0        1 */ ["eligi", (teksto) => {
    process.stdout.write(teksto.toString());
  }],
  /* 1        2 */ ['revena', () => {
  }]
];

const operaciajKodoAlBajtkodo = (ĉeno) => {
  for ( let i=0;i<operaciajKodoj.length;i++ ) {
    if (operaciajKodoj[i][0] == ĉeno) {
      return i+1;
    }
  }
}

const specifajParsajFunkcioj = {
  eligi: (ĉeno) => {
    return [ ĉeno ];
  }
}

const parametrojApartigilo = 0x1F;

// <instrukcio> <ĉeno> -> [param1, param2, param3]
const parsadoDeLaParametrojDeKomando = (instrukcio, ĉeno) => {
  if (specifajParsajFunkcioj[instrukcio]) {
    return specifajParsajFunkcioj[instrukcio](ĉeno);
  } else {
    return ĉeno.split(/[ ]+/).map(pĈeno => {
      return pĈeno.trim();
    });
  }
};

// [[0, "teksto"]]
const plenumiOperaciojn = (programoDatumoj) => {
  // Ni plenumas la operaciojn de la programo
  programoDatumoj.map(datumo => {
    operaciajKodoj[datumo[0]][1].apply(null, datumo.slice(1));
  });
};

// [["eligi", "teksto"]]
const plenumiOperaciojn2 = (programoDatumoj) => {
  // Ni plenumas la operaciojn de la programo
  programoDatumoj.map(datumo => {
    operaciajKodoj[operaciajKodoAlBajtkodo(datumo[0]) - 1][1].apply(null, datumo.slice(1));
  });
};

export { operaciajKodoj, operaciajKodoAlBajtkodo, parsadoDeLaParametrojDeKomando, parametrojApartigilo, plenumiOperaciojn, plenumiOperaciojn2 };
