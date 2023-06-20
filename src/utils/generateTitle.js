function randomNum(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export const generateTitle = {
  titleContain: [
    'Погулять с собакой',
    'Получить двойку',
    'Выучить Redux',
    'Победить TypeScript',
    'Взломать ChatGPT',
    'Ввергнуть чат ChatGPT в дипрессию',
    'Прокачаться до Middle+',
    'Быть добрым и терпеливым',
  ],
  getTitle: function () {
    const index = randomNum(0, this.titleContain.length - 1);
    return this.titleContain[index];
  },
};
