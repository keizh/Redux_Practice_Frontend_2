/* eslint-disable no-unused-vars */

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import {
  fetchMovies,
  deleteMovie,
  setEditData,
  addMovies,
} from "../features/MovieSlice/MovieSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const MovieList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Movies, error, status } = useSelector((state) => state.Movies);
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const handleEdit = (data) => {
    dispatch(setEditData(data));
    navigate("/addMovie");
  };

  return (
    <>
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
                  <div className="flex gap-5">
                    <Button
                      color="red"
                      onClick={() => dispatch(deleteMovie(ele._id))}
                    >
                      Delete
                    </Button>
                    <Button onClick={() => handleEdit(ele)}>EDIT</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MovieList;
