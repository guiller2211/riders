module.exports = {
  '*': ['nx format:write --files'],
  '*.ts?(x)': (allStagedFiles) => {
    const files = allStagedFiles.join(' ');
    return `npx eslint ${files} --fix`;
  },
};
