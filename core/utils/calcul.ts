import Notation from "../domain/Notation";

export const roundDecimal = (nombre: number, precision: number) => {
  precision = precision || 2;
  const tmp = Math.pow(10, precision);
  return Math.round(nombre * tmp) / tmp;
};

export const avgNote = (list: Notation[]) => {
  if (list.length) {
    let sum = 0;
    list.map((notation) => {
      if(notation.note) sum += notation.note;
    });
    return sum / list.length;
  } else {
    return 0;
  }
};
