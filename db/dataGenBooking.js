const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();
const faker = require('faker');
var count = 0;


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

const currentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
}

const dateBooked = () => {
    var dateObj = randomDate(new Date(2019, 4, 6), new Date(2019, 5, 6));
    var month = dateObj.getUTCMonth() + 1; 
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    
    var newdate = year + "-" + month + "-" + day;
    return newdate;
}

const num1Through10Mil = () => {
    return Math.floor(Math.random() * 10000000);
}
  


const dataGen  = () => {
    writer.pipe(fs.createWriteStream('bookingData.csv'));
    for (var i = 0; i < 30000000; i++) {
        writer.write({
            reservation_data: inRangeDate(),
            time_slot: randomTimeSlot(),
            party_size: guests(),
            restaurant_id: num1Through10Mil(),
            created_at: dateBooked()
        })
        if (count % 1000000 === 0) {
            console.log(count);
        }
        count++;
    }
    writer.end();
    console.log('done');
}

dataGen();