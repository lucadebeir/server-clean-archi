export const difficulty = (average_rate: number) => {
  if(average_rate == 3) {
    return 'Difficile';
  } else {
    if(average_rate > 2) {
     return  'Moyenne';
    }
    else {
      return 'Facile';
    }
  }
};
