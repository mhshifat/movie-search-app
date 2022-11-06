import axios from "axios";
import cron from "node-cron";

cron.schedule('0 0 1 * *', () =>  {
  console.log("Job started for getting all movies from rapid api.");
  
  const options = {
    method: 'GET',
    url: `${process.env.SERVER_URI || "http://localhost:8000"}/movies/publish`,
  };
  
  axios.request(options).then(function (response) {
    console.log("response.data", response.data);
    console.log("Job finished for getting all movies from rapid api.");
  }).catch(function (error) {
    console.error("Job failed for getting all movies from rapid api.");
    console.error(error);
  });
});
