import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import NoteForm from "./pages/NoteForm";
import NoteView from "./pages/NoteView";
import AuthForm from "./pages/AuthForm";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Gate from "./auth/Gate";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Gate />}>
        <Route path="login" element={<AuthForm />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<NoteForm />} />
          <Route path=":id" element={<NoteView />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
