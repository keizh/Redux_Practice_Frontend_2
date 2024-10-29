import { Routes, Route, Navigate } from "react-router-dom";

import MovieList from "./components/MovieList.jsx";
import PageDefault from "./components/PageDefault";
import AddMovie from "./components/AddMovie";

const app = () => {
  return (
    <div className="w-full py-5">
      <Routes>
        <Route path="/" element={<Navigate to="/movieList" replace />} />
        <Route path="/" element={<PageDefault />}>
          <Route path="addMovie" element={<AddMovie />} />
          <Route path="movieList" element={<MovieList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default app;
