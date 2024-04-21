import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsByAnaliticsFilterAsync,
  getAllProductsByFilterAsync,
  page,
  setPage,
} from "../redux/product/productSlice";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Analitics", href: "#", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ data, setData }) {
  const { month } = data;
  const dispatch = useDispatch();
  const currentPage = useSelector(page);
  const handleNavigateUser = (route) => {
    dispatch(setPage(route));
  };

  const getAllProductsByFilter = () => {
    try {
      dispatch(getAllProductsByFilterAsync(data));
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProductsByAynaliticsFilter = () => {
    try {
      dispatch(getAllProductsByAnaliticsFilterAsync({ month: data.month }));
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      getAllProductsByAynaliticsFilter();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [month, 1000]);

  return (
    <Disclosure as="nav" className="w-full bg-gray-800 fixed">
      {({ open }) => (
        <>
          <div className="mx-auto w-full md:max-w-7xl overflow-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="w-max flex items-center mr-[1rem] ">
                {currentPage === "Dashboard" && (
                  <div className="w-[20rem] pr-[1rem]">
                    <form class="max-w-md mx-auto">
                      <label
                        for="default-search"
                        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                      >
                        Search
                      </label>
                      <div class="relative">
                        <div
                          onClick={() => setData({ ...data, serach: "" })}
                          class="absolute  cursor-pointer inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                        >
                          <svg
                            class="w-4 h-4 cursor-pointer text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>
                        <input
                          onChange={(e) =>
                            setData({ ...data, search: e.target.value })
                          }
                          value={data?.search}
                          type="search"
                          id="default-search"
                          class="block w-full h-[3rem] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search products by price, name..."
                          required
                        />
                      </div>
                    </form>
                  </div>
                )}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center"></div>
                  <div className="">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          onClick={() => handleNavigateUser(item.name)}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white cursor-pointer"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-max rounded-md pr-2 md:pr-0  flex justify-center items-center">
                <select
                  onChange={(e) => setData({ ...data, month: e.target.value })}
                  className=" bg-gray-900 text-white rounded-md  text-md py-2 px-1 cursor-pointer "
                  value={data.month}
                >
                  <option value={1}>January</option>
                  <option value={2}>February</option>
                  <option value={3}>March</option>
                  <option value={4}>April</option>
                  <option value={5}>May</option>
                  <option value={6}>June</option>
                  <option value={7}>July</option>
                  <option value={8}>Aguest</option>
                  <option value={9}>September</option>
                  <option value={10}>October</option>
                  <option value={11}>November</option>
                  <option value={12}>December</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
