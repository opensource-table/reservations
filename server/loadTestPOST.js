import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,
  rps: 1,
  duration: "2m",
};

let min = 8000000;
let max = 10000000;


export default function() {
    let iterationStart = new Date().getTime(); // timestamp in ms
  
    const guests = () => {
        return Math.floor(Math.random() * 8);
    };
      
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
      let formData = [{
        reservation_date: inRangeDate(),
        time_slot: randomTimeSlot(),
        party_size: guests(),
        restaurant_id: num1Through10Mil(),
        created_at: dateBooked()
      }];

      let headers = { "Content-Type": "application/x-www-form-urlencoded" }
    // let randomID = Math.floor(Math.random() * 10000000);
      let res = http.post(`http://localhost:3020/reservations`, formData, { headers: headers });
  
    let iterationDuration = (new Date().getTime() - iterationStart) / 1000;
    let sleepTime = 1 - iterationDuration;  // 1 second minus time spent on request execution
    
    check(res, {
        "status was 200": (r) => r.status == 200,
        "transaction time OK": (r) => r.timings.duration < 200
      });

    if(sleepTime > 0){
      sleep(sleepTime);
    }
  };
  import http from "k6/http";

// export default function() {
//   var url = "http://test.loadimpact.com/login";
//   var payload = JSON.stringify({ email: "aaa", password: "bbb" });
//   var params =  { headers: { "Content-Type": "application/json" } }
//   http.post(url, payload, params);
// };

//   console.log(formData);

  // k6 run server/loadTestPOST.js