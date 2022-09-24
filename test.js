const fetch = require("node-fetch");


const main = async() => {
    const res = fetch('https://mlvet-bug-reporter-mlvet-bug-reporter-9xw6.vercel.app/api/reportBug', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title:'test title', description: 'test description'}),
  })

  console.log(await res);
}


main();