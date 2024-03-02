import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "nxhettry";
const yourPassword = "ilovecoding";
const yourAPIKey = "19e2b9a0-a416-42b1-87ba-3f01747770d4";
const yourBearerToken = "18426869-a230-4723-bc90-8ebd5a0b80a4";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const received = await axios.get(API_URL + "random");
    const data = JSON.stringify(received.data);
    res.render("index.ejs", {
      content: data,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const all = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const data = JSON.stringify(all.data);
    res.render("index.ejs", {
      content: data,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const filter = await axios.get(API_URL + "filter?emScore>=5", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    const data = JSON.stringify(filter.data);
    res.render("index.ejs", {
      content: data,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  const secrets = await axios.get(API_URL + "secrets/42", {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    },
  });
  const data = JSON.stringify(secrets.data);
  res.render("index.ejs", {
    content: data,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
