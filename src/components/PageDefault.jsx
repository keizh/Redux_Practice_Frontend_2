import { NavLink, Outlet } from "react-router-dom";
import { ButtonGroup, Button } from "@material-tailwind/react";
const PageDefault = () => {
  return (
    <div className="h-fit w-full flex flex-col items-center  gap-5">
      <NavLink to="/movieList">
        <Button>Movie List</Button>
      </NavLink>
      <NavLink to="/addMovie">
        <Button>Add Movie</Button>
      </NavLink>
      <Outlet />
    </div>
  );
};

export default PageDefault;
