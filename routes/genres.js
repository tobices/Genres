const express = require("express");
const app = express.Router();

const videos = [
  { id: 1, film: "moneyheist" },
  { id: 2, film: "india" },
  { id: 3, film: "asela" },
  { id: 4, film: "koto" },
];
//GET FILMS
app.get("/", (req, res) => {
  res.send(videos);
});

//UPDATE FILMS
app.put("/:id", (req, res) => {
  const video = videos.find((c) => c.id === parseInt(req.params.id));
  //Validation function
  if (!video) return res.status(404).send("THE VIDEO IS NOT AVAILABLE");
  const { error } = validationVideo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  video.film = req.body.film;
  res.send(video);
  const result = joi.validate(req.body, schema);
});

//Delete APPLICATION
app.delete("/:id", (req, res) => {
  //check video
  const video = videos.find((c) => c.id === parseInt(req.params.id));
  if (!video) return res.status(404).send("The film is not available");
  const index = videos.indexOf(video);
  videos.splice(index, 1);
  res.send(video);
});

//Function Validation
function validationVideo(video) {
  const schema = {
    film: joi.string().min(3).required(),
  };
  return joi.validate(video, schema);
}

module.exports = app;
