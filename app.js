const express = require("express");
const app = express();

const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send(
      "Sorry, the web application is only available during working hours."
    );
  }
};

app.use(workingHoursMiddleware);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/services", (req, res) => {
  res.sendFile(__dirname + "/views/services.html");
});

// Contact us page
app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/views/contact.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
