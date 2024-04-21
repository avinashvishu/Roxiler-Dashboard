import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsByAnaliticsFilter } from "../redux/product/productApi";
import BarChart from "./BarChart";
import {
  getAllProductsByAnaliticsFilterAsync,
  AnaliticsData,
  fetching,
  fetchingAnyalitics,
} from "../redux/product/productSlice";
import PieChart from "./PieChart";

export default function Stats() {
  const [data, setData] = useState(3);
  const [priceRangeData, setPriceRangeData] = useState([]);
  const [catagoryKeys, setCatagoryKeys] = useState([]);
  const [catagoryValues, setCatagoryValues] = useState([]);
  const dispatch = useDispatch();
  const analitics = useSelector(AnaliticsData);
  const isFetching = useSelector(fetchingAnyalitics);

  const getAllAnaliticsData = () => {
    try {
      dispatch(getAllProductsByAnaliticsFilterAsync({ month: data }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      getAllAnaliticsData();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [data]);

  useEffect(() => {
    if (analitics.priceRange) {
      let result = Object.keys(analitics.priceRange).map(
        (key) => analitics.priceRange[key]
      );
      setPriceRangeData([...result]);
    }
    if (analitics.PieCatagoryData) {
      const keysArray = Object.keys(analitics.PieCatagoryData);
      const valuesArray = Object.values(analitics.PieCatagoryData);
      setCatagoryKeys([...keysArray]);
      setCatagoryValues([...valuesArray]);
    }
  }, [analitics]);

  return (
    <section className="w-full h-full md:min-h-[100vh] flex justify-center pb-[3rem] md:pb-0 pt-[6rem] md:pt-[3rem] ">
      <div className="w-[95%] flex justify-center items-center ">
        {!isFetching ? (
          <div className="w-full flex-col md:flex-row flex justify-center items-center gap-y-5 md:gap-x-5">
            <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5  rounded-md w-[98%] h-[25rem] md:w-[25rem] md:h-[27rem]">
              <span className="font-semibold text-xl">
                Items According to the catagory
              </span>
              <PieChart KeyData={catagoryKeys} valueData={catagoryValues} />
            </div>
            <div className="md:max-w-[30rem] md:w-full w-[98%]  flex flex-col  gap-y-5">
              <div className="w-full flex flex-col shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 rounded-md h-max gap-y-2">
                <div className="w-full flex justify-between">
                  <span className="font-semibold text-md">Total Sale</span>
                  <span>{analitics.stats.totalSaleAmount}</span>
                </div>
                <div className="w-full flex justify-between">
                  <span className="font-semibold text-md">
                    Total Sold Items
                  </span>
                  <span>{analitics.stats.totalSoldItems}</span>
                </div>{" "}
                <div className="w-full flex justify-between">
                  <span className="font-semibold text-md">
                    Total Not Sold Items
                  </span>
                  <span>{analitics.stats.totalNotSoldItems}</span>
                </div>{" "}
              </div>

              <div className=" shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 rounded-md h-max">
                <span className="font-semibold text-xl">Price Range Data</span>

                <BarChart itemsArr={priceRangeData} />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <span className="text-2xl"> Loading....</span>
          </div>
        )}
      </div>
    </section>
  );
}
