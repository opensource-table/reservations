const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();
const faker = require('faker');
var count = 0;


const seats = () => faker.random.number({
  min: 0,
  max:2,
});

const booked = () => faker.random.number({
  min: 0,
  max: 10,
});

const dataGen  = () => {
    writer.pipe(fs.createWriteStream('restaurantData.csv'));
    for (var i = 0; i < 10000000; i++) {
        writer.write({
           name: faker.lorem.word(),
           booked: booked(),
           "6:00 PM": seats(),
           "6:15 PM": seats(),
           "6:30 PM": seats(),
           "6:45 PM": seats(),
           "7:00 PM": seats(),
           "7:15 PM": seats(),
           "7:30 PM": seats(),
           "7:45 PM": seats(),
           "8:00 PM": seats(),
           "8:15 PM": seats(),
           "8:30 PM": seats(),
        })
        count++;
        if (count % 1000000 === 0) {
            console.log(count);
        }
      }
      writer.end();
      console.log('done');
};

dataGen();

