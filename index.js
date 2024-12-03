const PORT = 8000

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')


const app = express()

const url = 'https://www.pcstudio.in/product-category/processor/'


axios(url)
.then(response=>{
    const html = response.data
    const $ = cheerio.load(html)

    const products = [];

    $('.woo-entry-inner', html).each(function() {
        const title = $(this).find('.title a span').attr('title') || $(this).find('.title a span').text();
        const price = $(this).find('.price ins .woocommerce-Price-amount').text().trim();
        const image = $(this).find('.woo-entry-image-main').attr('src');

        console.log('Current Product HTML:', $(this).html());

        console.log('Extracted Title:', title);
        console.log('Extracted Price:', price);
        console.log('Extracted Image URL:', image);

        products.push({
            title,
            price,
            image
        });
    });

    console.log(products);
})//.catch(err=>console.log(err))


app.listen(PORT, ()=>console.log(`server running on port ${PORT}`))




/*
        const title = $(this).text()
        const url = (this).find('ul').attr('href')
        articles.push({
            title,
            url
        })

        */


