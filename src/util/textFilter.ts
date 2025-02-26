export const scriptFilter = (text: string): string => {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\//g, "&#x2F;");
};

const badWord = ["용석", "다빈"];
export const badWordfIlter: (_: string) => string = (text) => {
  const isFindBadWord = badWord.filter((word) => {
    return text.includes(word);
  });

  if (isFindBadWord.length > 0) {
    let filterText = text;

    isFindBadWord.forEach((word) => {
      const filter = new RegExp(word, "g");
      const replacement = "*".repeat(word.length);
      filterText = filterText.replace(filter, replacement);
    });

    return filterText;
  }

  return text;
};
