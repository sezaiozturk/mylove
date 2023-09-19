export const randomUUID = () => {
  let rnd = '';
  for (let i = 1; i < 25; i++) {
    rnd += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    if (i % 6 == 0 && i != 24) {
      rnd += '-';
    }
  }
  return rnd;
};

export const formatDate = date => {
  if (date != null) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    return [day, month, year].join(' / ');
  }
};
