// const fs = require('fs');
// const csvWriter = require('csv-write-stream');
// var writer = csvWriter();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var faker = require('faker');
var counter = 1;

MongoClient.connect(url, (err, db) => {
  if (err) {
    throw err;
  }
  var dbo = db.db("reservations");
  dbo.collection("restaurants").insertMany()
})

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
 db.reservations.insert({
      id: counter++,
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
      },
});

// node --max-old-space-size=8192 server.js  

//READ




//UPDATE





//DELETE

