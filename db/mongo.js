const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();

var faker = require('faker');
var count = 0;


const seats = () => faker.random.number({
    min: 0,
    max: 20,
  });
  
  const booked = () => faker.random.number({
    min: 3,
    max: 15,
  });

  const guests = () => faker.random.number({
    min: 1,
    max: 8,
  });
  
  const randomTimeSlot = () => {
      var timeSlots = [
          '6:00 PM',
          '6:15 PM',
          '6:30 PM',
          '6:45 PM',
          '7:00 PM',
          '7:15 PM',
          '7:30 PM',
          '7:45 PM',
          '8:00 PM',
          '8:15 PM',
          '8:30 PM'
      ]; 
      return timeSlots[Math.floor(Math.random() * 11)];
  }
  
  const randomDate = (start, end) => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    
  const inRangeDate = () => {
      var dateObj = randomDate(new Date(2019, 5, 6), new Date(2019, 6, 6));
      var month = dateObj.getUTCMonth() + 1; 
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      
      var newdate = year + "-" + month + "-" + day;
      return newdate;
  }

  
  const dateBooked = () => {
      var dateObj = randomDate(new Date(2019, 4, 6), new Date(2019, 5, 6));
      var month = dateObj.getUTCMonth() + 1; 
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      
      var newdate = year + "-" + month + "-" + day;
      return newdate;
  }
  
 
//create

const dataGen  = () => {
  writer.pipe(fs.createWriteStream('restaurantAvailabilityData.csv'));
  for (var i = 0; i < 10000000; i++) {
      writer.write({
        _id: count++,
        name: faker.lorem.word(), 
        booked: booked(),
        bookings: [{reservation_date: inRangeDate(), time_slot: randomTimeSlot(), party_size: guests(), created_at: dateBooked()},{reservation_date: inRangeDate(), time_slot: randomTimeSlot(), party_size: guests(), created_at: dateBooked()},{reservation_date: inRangeDate(), time_slot: randomTimeSlot(), party_size: guests(), created_at: dateBooked()}],
        date: {
        '6:00 PM': seats(),
        '6:15 PM': seats(),
        '6:30 PM': seats(),
        '6:45 PM': seats(),
        '7:00 PM': seats(),
        '7:15 PM': seats(),
        '7:30 PM': seats(),
        '7:45 PM': seats(),
        '8:00 PM': seats(),
        '8:15 PM': seats(),
        '8:30 PM': seats(),
      }
    })
  }
    writer.end();
    console.log('done');
};

dataGen();

// node --max-old-space-size=8192 db/mongo.js  

// mongoimport --db reservations --collection restaurants --type csv --headerline --file  '/Users/esodey/Desktop/SDC/reservations/restaurantAvailabilityData.csv'



// db.restaurants.insertOne( { id: 10000001, name: 'link', booked: 3, bookings: [{reservation_date: '2018-6-23', time_slot: '6:30 PM', party_size: 4, created_at: '2018-6-11'}], date: { '6:00 PM': 10, '6:15 PM': 6, '6:30 PM': 12, '6:45 PM': 5, '7:00 PM': 9, '7:15 PM': 8, '7:30 PM': 10, '7:45 PM': 12, '8:00 PM': 4, '8:15 PM': 6, '8:30 PM': 5} });
