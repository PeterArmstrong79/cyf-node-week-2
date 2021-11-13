const SERVER_PORT = process.env.PORT || 4000;
const express = require("express");
const cors = require("cors");

// get the full list of albums
const albumsData = require("./albums");
const { request } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

// Get an ID number that hasn't already been used in albums
function newID() {
    // Get list of IDs
    let ids = albumsData.map(el => el.albumId).sort();
    let nextId = 1;
    // check if id string is taken
    while(ids.includes(`${nextId}`)) {
        nextId++;
    }
    return String(nextId);
}

app.get("/albums", (request, response) => {
    response.status(200).send(albumsData);
});

app.delete("/albums/:id", (request, response) => {

    const index = albumsData.findIndex((element) => {
        return element.albumId === request.params.id
    }) 

  if (index === -1) {
      response.sendStatus(404);
  } else {
      const deleteAlbum = albumsData.splice(index, 1);
      response.sendStatus(204)  
  }  
});

app.put("/albums/:id", (request, response) => {

  const index = albumsData.findIndex((element) => {
        return element.albumId === request.params.id
    })

  if (index === -1) {
      response.sendStatus(404);
  } else {
      const updateAlbum = request.body
      albumsData[index] = updateAlbum
      response.sendStatus(204)
  }
});



app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
