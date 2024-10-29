import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { addMovies, EditMovie } from "../features/MovieSlice/MovieSlice";
const movieSchema = z.object({
  name: z.string(),
  producer: z.string(),
  genre: z.string(),
});

export function AddMovie() {
  const dispatch = useDispatch();
  const initialData = {
    name: "",
    producer: "",
    genre: "",
  };
  const { Edit } = useSelector((state) => state.Movies);
  const [data, setData] = useState(initialData);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    if (Edit != null) {
      setData(Edit);
    }
  }, [Edit]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (movieSchema.safeParse(data).success == true) {
      if (Edit == null) {
        dispatch(addMovies(data));
      } else {
        dispatch(EditMovie(data));
      }
      setData(initialData);
    }
  };
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Add Movie
      </Typography>

      <form
        onSubmit={submitHandler}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Input
            label="Name"
            required
            value={data.name}
            onChange={changeHandler}
            name="name"
          />
          <Input
            label="Producer"
            required
            value={data.producer}
            onChange={changeHandler}
            name="producer"
          />
          <Input
            label="Genre"
            required
            value={data.genre}
            onChange={changeHandler}
            name="genre"
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Add Movie
        </Button>
      </form>
    </Card>
  );
}

export default AddMovie;
