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

export { operaciajKodoj, operaciajKodoAlBajtkodo, parsadoDeLaParametrojDeKomando, parametrojApartigilo };
