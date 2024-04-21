import React, { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

import { useSelector, useDispatch } from "react-redux";
import {
  fetching,
  getAllProductsByFilterAsync,
  notFound,
  products,
} from "../redux/product/productSlice";
import { BeatLoader } from "react-spinners";

const Dashbord = ({ data, setData }) => {
  const allOrders = useSelector(products);
  const isFetching = useSelector(fetching);
  const noResultFound = useSelector(notFound);
  const dispatch = useDispatch();

  const getAllProductsByFilter = () => {
    try {
      dispatch(getAllProductsByFilterAsync(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getAllProductsByFilter();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [data, 1000]);

  return (
    <section className="w-full pt-[5rem]  flex justify-center items-center">
      <div className="hidden w-[70rem] flex-col gap-y-5  md:flex justify-center items-center">
        {!noResultFound && allOrders.length ? (
          <div className="  max-h-[70vh] overflow-auto">
            <table class="shadow-lg  bg-white">
              <tr className="">
                <th class="bg-blue-100 border text-left px-8 py-4">ID</th>
                <th class="bg-blue-100 border text-left px-8 py-4">Title</th>
                <th class="bg-blue-100 border text-left px-8 py-4">
                  Description
                </th>
                <th class="bg-blue-100 border text-left px-8 py-4">Price</th>
                <th class="bg-blue-100 border text-left px-8 py-4">Sold</th>
                <th class="bg-blue-100 border text-left px-8 py-4">Image</th>
              </tr>

              <>
                {allOrders?.length && !isFetching
                  ? allOrders?.map((order) => (
                      <>
                        <tr>
                          <td class="border px-8 py-4">{order.id}</td>
                          <td class="border px-8 py-4">
                            {order.title.slice(0, 20)}...
                          </td>
                          <td class="border px-8 py-4">
                            {order.description.slice(0, 20)}...
                          </td>
                          <td class="border px-8 py-4">{order.price}</td>
                          <td class="border px-8 py-4">
                            {order.sold ? "Sold" : ""}
                          </td>
                          <td class="border px-8 py-4">
                            {order.image.slice(0, 20)}...
                          </td>
                        </tr>
                      </>
                    ))
                  : [1, 2, 3, 4, 5, 6].map(() => (
                      <>
                        <tr>
                          <td class="border px-8 py-4">
                            {" "}
                            <BeatLoader color="#36d7b7" />
                          </td>
                          <td class="border px-8 py-4">
                            <BeatLoader color="#36d7b7" />
                          </td>
                          <td class="border px-8 py-4">
                            <BeatLoader color="#36d7b7" />
                          </td>
                          <td class="border px-8 py-4">
                            {" "}
                            <BeatLoader color="#36d7b7" />
                          </td>
                          <td class="border px-8 py-4">
                            <BeatLoader color="#36d7b7" />
                          </td>
                          <td class="border px-8 py-4">
                            <BeatLoader color="#36d7b7" />
                          </td>
                        </tr>
                      </>
                    ))}
              </>
            </table>
          </div>
        ) : (
          <div className="w-full font-semibold text-[1.5rem] flex justify-center items-center min-h-[23rem]">
            {isFetching ? (
              <span>Loading.... </span>
            ) : (
              <span>No result found! </span>
            )}
          </div>
        )}
        <div className="flex w-full justify-center items-center gap-x-5">
          <button
            disabled={data.page === 1 ? true : false}
            onClick={() => setData({ ...data, page: data.page - 1 })}
            className={`h-[2.5rem] w-[6rem] rounded-md bg-blue-500 text-white ${
              data.page === 1 && "opacity-55"
            }`}
          >
            &#x2190; Prev
          </button>
          <button
            disabled={allOrders.length === 10 ? false : true}
            onClick={() => setData({ ...data, page: data.page + 1 })}
            className={`h-[2.5rem] w-[6rem] rounded-md bg-green-500 text-white ${
              allOrders.length < 10 && "opacity-55"
            }`}
          >
            Next &rarr;
          </button>
        </div>
      </div>
      <div className="md:hidden w-full min-h-[80vh] flex-col gap-y-5  flex justify-center items-center">
        {!noResultFound && allOrders.length ? (
          <div className="  max-h-[70vh] overflow-auto">
            <table class="shadow-lg  bg-white">
              <tr className="">
                <th class="bg-blue-100 border text-left px-2 py-4">ID</th>
                <th class="bg-blue-100 border text-left px-2 py-4">Title</th>
                <th class="bg-blue-100 border text-left px-2 py-4">
                  Description
                </th>
                <th class="bg-blue-100 border text-left px-2 py-4">Price</th>
                <th class="bg-blue-100 border text-left px-2 py-4">Sold</th>
              </tr>

              <>
                {allOrders?.length && !isFetching
                  ? allOrders?.map((order) => (
                      <>
                        <tr className="text-sm">
                          <td class="border px-0 py-4">{order.id}</td>
                          <td class="border px-0 py-4">
                            {order.title.slice(0, 10)}...
                          </td>
                          <td class="border px-0 py-4">
                            {order.description.slice(0, 10)}...
                          </td>
                          <td class="border px-0 py-4">{order.price}</td>
                          <td class="border px-0 py-4">
                            {order.sold ? "Sold" : ""}
                          </td>
                        </tr>
                      </>
                    ))
                  : [1, 2, 3, 4, 5, 6].map(() => (
                      <>
                        <tr>
                          <td class="border px-2 py-4">
                            {" "}
                            <BeatLoader size={10} color="#36d7b7" />
                          </td>
                          <td class="border px-2 py-4">
                            <BeatLoader size={10} color="#36d7b7" />
                          </td>
                          <td class="border px-2 py-4">
                            <BeatLoader size={10} color="#36d7b7" />
                          </td>
                          <td class="border px-2 py-4">
                            {" "}
                            <BeatLoader size={10} color="#36d7b7" />
                          </td>
                          <td class="border px-2 py-4">
                            <BeatLoader size={10} color="#36d7b7" />
                          </td>
                        </tr>
                      </>
                    ))}
              </>
            </table>
          </div>
        ) : (
          <div className="w-full font-semibold text-[1.5rem] flex justify-center items-center min-h-[23rem]">
            {isFetching ? (
              <span>Loading.... </span>
            ) : (
              <span>No result found! </span>
            )}
          </div>
        )}
        <div className="flex mt-[1rem] md:mt-0 w-full justify-center items-center gap-x-5">
          <button
            disabled={data.page === 1 ? true : false}
            onClick={() => setData({ ...data, page: data.page - 1 })}
            className={`h-[2.5rem] w-[6rem] rounded-md bg-blue-500 text-white ${
              data.page === 1 && "opacity-55"
            }`}
          >
            &#x2190; Prev
          </button>
          <button
            disabled={allOrders.length === 10 ? false : true}
            onClick={() => setData({ ...data, page: data.page + 1 })}
            className={`h-[2.5rem] w-[6rem] rounded-md bg-green-500 text-white ${
              allOrders.length < 10 && "opacity-55"
            }`}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashbord;
