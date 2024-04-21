import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getAllProductsByFilter,
  getAllProductsByAnaliticsFilter,
} from "./productApi";

const initialState = {
  products: [] || [],
  fetching: false,
  notFound: false,
  Analitics: {} || {},
  page: "Dashboard",
  toggle: false,
  fetchingAnyalitics: false,
};

export const getAllProductsAsync = createAsyncThunk(
  "get/products",
  async () => {
    const response = await getAllProducts();

    return response.data.response;
  }
);

export const getAllProductsByFilterAsync = createAsyncThunk(
  "filter/products",
  async (data) => {
    const response = await getAllProductsByFilter(data);

    return response.data.response;
  }
);

export const getAllProductsByAnaliticsFilterAsync = createAsyncThunk(
  "filter/Analitics/products",
  async (data) => {
    const response = await getAllProductsByAnaliticsFilter(data);
    return response.data;
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state, action) => {
        state.fetching = true;
        state.notFound = false;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload || [];
        state.fetching = false;
        state.notFound = false;
      })
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        state.fetching = false;

        state.products = [];
        state.notFound = true;
      })
      .addCase(getAllProductsByFilterAsync.pending, (state, action) => {
        state.fetching = true;
        state.notFound = false;
      })
      .addCase(getAllProductsByFilterAsync.fulfilled, (state, action) => {
        state.products = action.payload || [];
        state.fetching = false;
        state.notFound = false;
      })
      .addCase(getAllProductsByFilterAsync.rejected, (state, action) => {
        state.products = [];
        state.notFound = true;
        state.fetching = false;
      })
      .addCase(
        getAllProductsByAnaliticsFilterAsync.pending,
        (state, action) => {
          state.fetchingAnyalitics = true;
          state.notFound = false;
        }
      )
      .addCase(
        getAllProductsByAnaliticsFilterAsync.fulfilled,
        (state, action) => {
          state.Analitics = action.payload;
          state.toggle = state.toggle ? false : true;
          state.fetchingAnyalitics = false;
          state.notFound = false;
        }
      )
      .addCase(
        getAllProductsByAnaliticsFilterAsync.rejected,
        (state, action) => {
          state.products = [];
          state.notFound = true;
          state.fetchingAnyalitics = false;
        }
      );
  },
});
export const { setPage } = ProductSlice.actions;

export const products = (state) => state.product.products;
export const fetchingAnyalitics = (state) => state.product.fetchingAnyalitics;
export const toggle = (state) => state.product.toggle;
export const page = (state) => state.product.page;
export const AnaliticsData = (state) => state.product.Analitics;
export const notFound = (state) => state.product.notFound;
export const fetching = (state) => state.product.fetching;

export default ProductSlice.reducer;
