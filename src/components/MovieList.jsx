/* eslint-disable no-unused-vars */
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  fetchMovies,
  deleteMovie,
  addMovies,
} from "../features/MovieSlice/MovieSlice";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const MovieList = () => {
  const dispatch = useDispatch();
  const { Movies, error, status } = useSelector((state) => state.Movies);
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <div className="w-fit h-fit">
      {status == "loading" && Movies.length == 0 && <p>Loading</p>}
      {status != "loading" && Movies.length == 0 && <p>No Movies</p>}
      {Movies.length > 0 && (
        <div className="w-[400px]">
          {Movies.map((ele) => (
            <Card key={ele._id} className="my-6 ">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Movie Details
                </Typography>
                <Typography>
                  <span className="font-black">Name:</span> {ele.name}
                </Typography>
                <Typography>
                  <span className="font-black">Producer:</span> {ele.producer}
                </Typography>
                <Typography>
                  <span className="font-black">Genre:</span> {ele.genre}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  color="red"
                  onClick={() => dispatch(deleteMovie(ele._id))}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
