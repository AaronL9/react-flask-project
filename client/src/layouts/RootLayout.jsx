import { NavLink, Link, Outlet } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import Loader from "../components/Loader";
import { useAuthContext } from "../hooks/useAuthContext";

const RootLayout = () => {
  const { logout, isLoading } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {isLoading && <Loader />}
      <header>
        <div className="container">
          <Link to="/">
            <h1>NoteSwift</h1>
            <p>{user.email}</p>
          </Link>
          <nav>
            <ul>
              <li>
                <NavLink to={"/"}>NOTES</NavLink>
              </li>
              <li>
                <NavLink to={"/create"}>NEW NOTES</NavLink>
              </li>
              <li>
                <i
                  onClick={handleLogout}
                  className="fa-solid fa-right-from-bracket fa-2x"
                ></i>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
