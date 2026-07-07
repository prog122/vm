import fs from 'fs';

const logikoDePlurajValoroj = {
  valorojPorRedoni: {},
};

const parametrojApartigilo = 0x1F;
const parametrojApartigilo2 = {
  numero: 124,
  ĉeno: '|'
};

const tipoj = [
  'bulea',
  'entjero',
  'glitkoma-nombro',
  'ĉeno'
];
const tipojInicializiloj = {
  'bulea': (valoro) => {
    throw new Error('...');
  },
  'entjero': (valoro) => {
    throw new Error('...');
  },
  'glitkoma-nombro': (valoro) => {
    throw new Error('...');
  },
  'ĉeno': (valoro) => {
    return valoro.toString();
  }
};

const kreiVokokuntekston = () => {
  return {
    registroj: [],
    konstantoj: []
  };
};

const operaciajKodoj = [
  /* indekso, bajtkodo */
  /* 0        1 */ ["eligi", (funkciaObjekto, teksto) => {
    process.stdout.write(teksto.toString());
  }],
  /* 1        2 */ ['revena', (funkciaObjekto) => {
    return funkciaObjekto;
  }],
  /* 2        3 */ ['difini-konstantojn', (funkciaObjekto, ... args) => {
    return args.map(valoro => {
      const indekso = valoro.indexOf(parametrojApartigilo2.ĉeno)
      const tipo = valoro.slice(0, indekso);
      const val = valoro.slice(indekso+1);

      funkciaObjekto.konstantoj.push(tipojInicializiloj[tipoj[tipo]](val));
    });
  }],
  /* 3        4 */ ['eligi-valoron', (funkciaObjekto, registro) => {
    process.stdout.write(funkciaObjekto.registroj[registro]);
    return funkciaObjekto.registroj[registro];
  }],
  /* 4        5 */ ['ŝargi-konstanton', (funkciaObjekto, celaRegistro, fontaRegistro) => {
    funkciaObjekto.registroj[celaRegistro] = funkciaObjekto.konstantoj[fontaRegistro];
    return funkciaObjekto.registroj[celaRegistro];
  }],
  /* indekso, bajtkodo */
  /* 5        6 */ ['difini-fermaĵo', (funkciaObjekto, celaRegistro) => {
    if (funkciaObjekto.enLaDifinoDeFermaĵo) {
      return {};
    }

    funkciaObjekto.funkciaNombrilo = celaRegistro;

    funkciaObjekto.enLaDifinoDeFermaĵo = (funkciaObjekto.enLaDifinoDeFermaĵo || 0) + 1;
    return {
      memorigiLaKomenconDeFermaĵo: true
    };
  }],
  /* 6        7 */ ['fini-difinon-de-fermaĵo', (funkciaObjekto, celaRegistro, fontaRegistro) => {
    funkciaObjekto.enLaDifinoDeFermaĵo -= 1;

    if (funkciaObjekto.enLaDifinoDeFermaĵo == 0) {
      return {
        memorigiLaFinonDeFermaĵo: true
      }
    }
  }],
  /* 7        8 */ ['voki', (funkciaObjekto, celaRegistro, fontaRegistro) => {
    plenumiOperaciojn(funkciaObjekto.registroj[celaRegistro].komandoj, kreiVokokuntekston(), true);
  }]
];

const operaciajKodoAlBajtkodo = (ĉeno, npilTabelo = {}) => {
  for ( let i=0;i<operaciajKodoj.length;i++ ) {
    if (npilTabelo[ĉeno]) {
      ĉeno = npilTabelo[ĉeno];
    }

    if (operaciajKodoj[i][0] == ĉeno) {
      return i+1;
    }
  }

  throw new Error("Nekonata operacio " + ĉeno);
}

const specifajParsajFunkcioj = {
  eligi: (ĉeno) => {
    return [ ĉeno ];
  },
  'difini-konstantojn': (ĉeno) => {
    const rezulto = [];

    for (let i of ĉeno.matchAll(/[(][^)]+[)]/g)) {
      let valoro = i[0].slice(1, -1).split(/\s+/);
      rezulto.push(tipoj.indexOf(valoro[0]) + parametrojApartigilo2.ĉeno + valoro[1]);
    }

    return rezulto;
  }
}

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

const plenumuOperacio = (operacio, datumo, indekso, funkciaObjekto, programoDatumoj) => {
  if (!funkciaObjekto.enLaDifinoDeFermaĵo || operacio[0] == 'fini-difinon-de-fermaĵo') {
    let revenaValoro = operacio[1].apply(null, [funkciaObjekto].concat(datumo.slice(1)));
    if (revenaValoro && revenaValoro.memorigiLaKomenconDeFermaĵo) {
      funkciaObjekto.komencaIndeksoDeFermaĵo = indekso;
    }

    if (revenaValoro && revenaValoro.memorigiLaFinonDeFermaĵo) {
      funkciaObjekto.registroj[funkciaObjekto.funkciaNombrilo] = {
        komandoj: programoDatumoj.slice(funkciaObjekto.komencaIndeksoDeFermaĵo + 1, indekso)
      };
    }
    return;
  }
};

// [[0, "teksto"]]
const plenumiOperaciojn = (programoDatumoj, funkciaObjekto = {}) => {
  // Ni plenumas la operaciojn de la programo
  programoDatumoj.map((datumo, indekso) => {
    plenumuOperacio(operaciajKodoj[datumo[0]], datumo, indekso, funkciaObjekto, programoDatumoj);
  });
};

// @g
// Kontrolo ĉu objekto estas malplena en JavaScript
function estasMalplena(objekto) {
  return Object.keys(objekto).length === 0;
}

// [["eligi", "teksto"]]
const plenumiOperaciojn2 = (programoDatumoj, npilTabelo = {}, funkciaObjekto = {}) => {
  if (estasMalplena(funkciaObjekto)) {
    funkciaObjekto = kreiVokokuntekston();
  }

  const interŝanĝita = Object.fromEntries(
    Object.entries(npilTabelo).map(([ŝlosilo, valoro]) => [valoro, ŝlosilo])
  );
  // Ni plenumas la operaciojn de la programo
  programoDatumoj = programoDatumoj.map((datumo, indekso) => {
    if (!interŝanĝita[datumo[0]]) {
      datumo[0] = operaciajKodoAlBajtkodo(datumo[0]) - 1;
    } else {
      datumo[0] = operaciajKodoAlBajtkodo(interŝanĝita[datumo[0]]) - 1;
    }

    return datumo;
  });

  programoDatumoj = programoDatumoj.map((datumo, indekso) => {
    plenumuOperacio(operaciajKodoj[datumo[0]], datumo, indekso, funkciaObjekto, programoDatumoj);
  });
};

const legiLaTabelonNPIL = (dosiero) => {
  let tabelo = {};

  try {
    let datumoj = fs.readFileSync(dosiero, "utf8").trim();
    datumoj.split("\n").map(linio => {
      let [valoro, ŝlosilo] = linio.trim().split(" ");
      tabelo[ŝlosilo] = valoro;
    });
  } catch(eraro) {
    if (eraro) {
      console.error("Eraro ĉe legado de dosiero:", eraro);
      return null;
    }
  }

  return tabelo;
};

export { operaciajKodoj, operaciajKodoAlBajtkodo, parsadoDeLaParametrojDeKomando, parametrojApartigilo, plenumiOperaciojn, plenumiOperaciojn2, legiLaTabelonNPIL, kreiVokokuntekston };
