import { getHtml, getEntries } from "../lib/scraper";

const express = require("express");
const entitiesRoutes = express.Router();

//App configs & rutes
entitiesRoutes.get('/', async (req, res) => {
    console.log('scraping!');
    const html = await getHtml('https://news.ycombinator.com/');
    getEntries(html).then(data => {
        res.json( {data} );
    }).catch(err => {
        console.error(err);
    });
});
module.exports= entitiesRoutes