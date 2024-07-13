const commentPrefixes: { [key: string]: string } = {
  'c': '// ',
  'cpp': '// ',
  'rust': '// ',
  'javascript': '// ',
  'java': '// ',
  'kotlin': '// ',
  'ruby': '# ',
  'python': '# '
};

function generateMeowBox(username: string, date: string): string {
  const meow = [
      " /\\_/\\ ",
      "( o.o )",
      " > ^ < "
  ];

  const maxUserDateLength = username.length + date.length + 3;
  const maxContentLength = Math.max(...meow.map(line => line.length), maxUserDateLength);
  const maxWidth = maxContentLength + 4;

  const template = [
      `+${'-'.repeat(maxWidth - 2)}+`,
      `| ${username} - ${date.padEnd(maxWidth - maxUserDateLength - 3)} |`,
      `| PurrfectKittens${' '.repeat(maxWidth - 18)}|`,
      `|${' '.repeat(maxWidth - 2)}|`,
      ...meow.map(line => `| ${line.padEnd(maxWidth - 4)} |`),
      `+${'-'.repeat(maxWidth - 2)}+`
  ];

  return template.join('\n');
}

export function generateComment(username: string, language: string): string {
  const date = new Date().toISOString().split('T')[0];
  const meowBox = generateMeowBox(username, date);

  const comment = commentPrefixes[language];
  if (!comment) {
      throw new Error(`Langage non supporter: ${language}`);
  }

  return meowBox.split('\n').map(line => comment + line).join('\n');
}
