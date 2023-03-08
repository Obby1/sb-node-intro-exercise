const fs = require('fs');
const axios = require('axios');

function cat(path, outPath) {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${path}, ${err}`);
        return;
      }
      if (outPath) {
        fs.writeFile(outPath, data, err => {
          if (err) {
            console.error(`Couldn't write ${outPath}:`);
            console.error(`${err}`);
          }
        });
      } else {
        console.log(data);
      }
    });
  }

// const path = process.argv[2];
// cat(path);

async function webCat(url, outPath) {
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (outPath) {
        fs.writeFile(outPath, data, err => {
          if (err) {
            console.error(`Couldn't write ${outPath}:`);
            console.error(`${err}`);
          } 
        });
      } else {
        console.log('success!')
        console.log(data);
      }
    } catch (error) {
      console.error(`Error fetching ${url}:`);
      console.error(`${error}`);
    }
  }

const arg = process.argv[2];
const outArgIndex = process.argv.indexOf('--out');

if (outArgIndex === -1) {
    if (arg.startsWith('http')) {
      webCat(arg);
    } else {
      cat(arg);
    }
  } else {
    const outPath = process.argv[outArgIndex + 1];
    const path = process.argv[outArgIndex + 2];
    if (path.startsWith('http')) {
      webCat(path, outPath);
    } else {
      cat(path, outPath);
    }
  }


// if (process.argv[2].slice(-3) == 'txt'){
//     cat(path);
// } else{
//     webCat(path);
// }

// webCat(path);
// if ( process.argv[2].startsWith('http') )
// https://www.google.com/