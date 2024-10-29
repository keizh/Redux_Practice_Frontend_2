import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("GET/fetchMovies", async () => {
  const response = await fetch(`http://localhost:5500/api/v1/Movies`, {
    method: "GET",
  });
  const dataRes = await response.json();
  console.log(dataRes);
  return dataRes.data;
});

export const addMovies = createAsyncThunk(
  `POST/addMovies`,
  async (data, { dispatch }) => {
    console.log(data);
    const response = await fetch("http://localhost:5500/api/v1/Movies", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataRes = await response.json();
    dispatch(addMovieSYNC(data));
    return dataRes.data;
  }
);

export const deleteMovie = createAsyncThunk(
  `DELETE/deleteMovie`,
  async (id, { dispatch }) => {
    const response = await fetch(`http://localhost:5500/api/v1/Movies/${id}`, {
      method: "DELETE",
    });
    const dataRes = await response.json();
    dispatch(deleteMovieSYNC(id));
    return dataRes;
  }
);

export const EditMovie = createAsyncThunk(
  "UPDATE/Movie",
  async (data, { dispatch }) => {
    console.log(`UPDATE/Movie`);
    const response = await fetch(`http://localhost:5500/api/v1/MoviesUpdates`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataRes = await response.json();
    dispatch(updatedDataSYNC(data));
    return dataRes.newData;
  }
);

const MovieSlice = createSlice({
  name: "MovieSlice",
  initialState: {
    Movies: [],
    error: null,
    status: "idle", // loading , successfull , error
    Edit: null,
  },
  reducers: {
    addMovieSYNC: (state, action) => {
      state.Movies = [...state.Movies, action.payload];
    },
    deleteMovieSYNC: (state, action) => {
      state.Movies = state.Movies.filter((ele) => ele._id != action.payload);
    },
    setEditData: (state, action) => {
      state.Edit = action.payload;
    },
    updatedDataSYNC: (state, action) => {
      state.Movies = state.Movies((ele) => {
        if (ele._id == action.payload._id) {
          return action.payload;
        } else {
          return ele;
        }
      });
      state.Edit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "successfull";
        state.Movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(addMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMovies.fulfilled, (state, action) => {
        state.status = "successfull";
        state.Movies = [...action.payload];
      })
      .addCase(addMovies.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(deleteMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMovie.fulfilled, (state) => {
        state.status = "successfull";
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(EditMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(EditMovie.fulfilled, (state) => {
        state.status = "successfull";
      })
      .addCase(EditMovie.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { addMovieSYNC, deleteMovieSYNC, setEditData, updatedDataSYNC } =
  MovieSlice.actions;

export default MovieSlice;
