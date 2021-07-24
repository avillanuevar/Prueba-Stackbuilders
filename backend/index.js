import express from 'express';
import { getHtml, getEntries } from "./lib/scraper";
import db from './lib/db.js';


const app = express();

// Set lowdb for storage


//App configs & rutes
app.get('/', async (req, res, next) => {
    console.log('scraping!');
    const html = await getHtml('https://news.ycombinator.com/');
    getEntries(html).then(data => {
        let entries = data
        console.log(entries);
        db.get('data').push({
            date: Date.now(),
            entries: data
        })
        .write();
        res.json( {data} );
    }).catch(err => {
        console.error(err);
    });
   ;
    
});

app.listen(8000, () => {
    console.log('server running on port 8000');
})


