import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// import Grid from '@material-ui/core/Grid'
import { useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import ImageGrid from "./components/imageGrid";

export default function App() {
  const [input, setInput] = useState("");
  const [loading, isLoading] = useState(false);
  const [imageArr, setImageArr] = useState([]);

  const clicked = () => {
    isLoading(true);
    // alert(input);
    let url = `https://api.unsplash.com/search/photos?page=1&query=${input}&orientation=squarish&client_id=WHmwKUu8NH-oXRDGL8BKXcAjeI6AvMsXUsohsdJ0GKw&w=100&h=100`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //data.results is the arr of objs
        setImageArr(data.results);
        isLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          textAlign: "center",
          fontSize: "30px",
        }}
      >
        <h1>HD Image Search</h1>
      </div>

      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Image name"
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            onClick={clicked}
            variant="contained"
            color="secondary"
            size="large"
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {loading && <CircularProgress />}
      {!loading && <ImageGrid imageArr={imageArr} />}
    </div>
  );
}
