const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${path}, ${err}`);
        return;
      }
      console.log(data);
    });
  }

// const path = process.argv[2];
// cat(path);

async function webCat(url) {
    try {
      const response = await axios.get(url);
      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching ${url}:`);
      console.error(`${error}`);
    }
  }

const path = process.argv[2];

if (process.argv[2].slice(-3) == 'txt'){
    cat(path);
} else{
    webCat(path);
}

// webCat(path);
// if ( process.argv[2].startsWith('http') )
// https://www.google.com/