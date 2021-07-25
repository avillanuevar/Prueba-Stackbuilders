import axios from 'axios'
import cheerio from 'cheerio'

//get html from the web site
async function getHtml(url) {
    const { data: html } = await axios.get(url);
    return html;
}

//function created to do the wed scraping and filter them to an object
async function getEntries(html) {
//load cheerio
const $ = cheerio.load(html);
const titleAndPosition = $('.athing');
const commentsAndPoints = $('.subtext');
let entriesArray = [];

//separates the title and position from the HTML and enters then on the array
titleAndPosition.each( function(idx, value) {
    let title = $(value).find('.storylink').text();
    let rank = $(value).find('.rank').text().split('.')[0];
    entriesArray.push({
        title: title,
        rank: rank
    })
});

//separates the commments and points from the HTML and asignes 
//them to it's corresponding object in the array
commentsAndPoints.each( function(idx, value) {
    let points = $(value).find('.score').text().split(' ')[0];
    let comments = '';
    const allAnchors = $(value).find('a');
    allAnchors.each( function(idx, value) {
        if(idx === 3) {
            if($(value).text() === 'discuss') {
                comments = '0';
            } else {
                let separateComment = $(value).text().split('comments')[0].split('');
                if(separateComment.length > 6) {
                    separateComment = $(value).text().split('comment')[0].split('');
                }
                separateComment.pop();
                comments = separateComment.join('');
            }
        };
    })
    entriesArray[idx].points = points;
    entriesArray[idx].comments = comments;
});
return entriesArray;
}

export { getHtml, getEntries };