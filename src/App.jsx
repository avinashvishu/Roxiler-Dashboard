import { useEffect, useState } from "react";

import "./App.css";

import Dashbord from "./components/dashbord";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsAsync,
  page,
  toggle,
} from "./redux/product/productSlice";
import Navbar from "./components/navbar";
import Stats from "./components/stats";

function App() {
  const [data, setData] = useState({ page: 1, month: 3, search: "" });
  const userPage = useSelector(page);
  const dispatch = useDispatch();
  const getAllProducts = () => {
    dispatch(getAllProductsAsync());
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <Navbar data={data} setData={setData} />
      {userPage === "Dashboard" ? (
        <Dashbord data={data} setData={setData} />
      ) : (
        <Stats />
      )}
    </div>
  );
}

export default App;
