import http from "k6/http";
import { check, sleep } from "k6";

let desiredRPS = 100;
let RPSperVU = 1;

let VUsRequired = Math.round(desiredRPS/RPSperVU);

export let options = {
  vus: VUsRequired,
  duration: "3m",
};

export default function() {
    let iterationStart = new Date().getTime(); // timestamp in ms
  
    let randomID = Math.floor(Math.random() * 10000000);
      let res = http.get(`http://localhost:3020/${randomID}/reservations`);
  
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

  // k6 run server/loadTest.js