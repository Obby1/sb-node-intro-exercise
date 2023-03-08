// not sure if this works well

const fs = require('fs');
const axios = require('axios');

function cat(path, outPath) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    if (outPath) {
      fs.writeFile(outPath, data, err => {
        if (err) {
          console.error(`Couldn't write ${outPath}:`);
          console.error(`  ${err}`);
        }
      });
    } else {
      console.log(data);
    }
  });
}

async function webCat(url, outPath) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    if (outPath) {
      fs.writeFile(outPath, data, err => {
        if (err) {
          console.error(`Couldn't write ${outPath}:`);
          console.error(`  ${err}`);
        }
      });
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error(`Error fetching ${url}:`);
    console.error(`  ${error}`);
  }
}

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg === '--out') {
    const outPath = process.argv[i + 1];
    const path = process.argv[i + 2];
    if (path.startsWith('http')) {
      webCat(path, outPath);
    } else {
      cat(path, outPath);
    }
    i += 2;
  } else {
    if (arg.startsWith('http')) {
      webCat(arg);
    } else {
      cat(arg);
    }
  }
}
