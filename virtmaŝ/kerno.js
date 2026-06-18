let operaciajKodoj = [
  /* 0 1 */ ["eligi", (teksto) => {
    process.stdout.write(teksto.toString());
  }]
];

let operaciajKodoAlBajtkodo = (ĉeno) => {
  for ( let i=0;i<operaciajKodoj.length;i++ ) {
    if (operaciajKodoj[i][0] == ĉeno) {
      return i+1;
    }
  }
}

export { operaciajKodoj, operaciajKodoAlBajtkodo };
