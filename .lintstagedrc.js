// {
//     "*.ts": [
//         ,
//         "ng lint",

//     ]
// }

module.exports = {
  '*.ts': (files) => [
    'pretty-quick --staged',
    `ng lint ${files
      .map((file) => `--files ${file.substring(file.indexOf('/src'))}`)
      .join(' ')}`,
    'npm run test:staged',
  ],
};
