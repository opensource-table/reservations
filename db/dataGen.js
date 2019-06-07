const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();
const faker = require('faker');
var count = 0;


const seats = () => faker.random.number({
  min: 2,
  max: 10,
});

const booked = () => faker.random.number({
  min: 3,
  max: 15,
});

const dataGen  = () => {
    writer.pipe(fs.createWriteStream('data.csv'));
    for (var i = 0; i < 10000000; i++) {
        writer.write({
            id: count++,
            price: faker.commerce.price()
        })
        if (count % 1000000 === 0) {
            console.log(count);
        }
    }
    writer.end();
    console.log('done');
}

dataGen();
