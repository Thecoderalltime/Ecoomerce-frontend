import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchBrands,
  fetchCetegory,
  getProductById,
  getProductsByFilters,
  updateProductById,
} from "./ProductApi";

export const createProductAsync = createAsyncThunk("product/createProduct", async (product) => {
  const response = await createProduct(product)
  return response.data;
})


export const updateProductByIdAsync = createAsyncThunk("product/updateProductByIdAsync", async (product) => {
  const response = await updateProductById(product)
  return response.data;
})

export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchCetegorisAsync = createAsyncThunk(
  "product/fetchCetegorisAsync",
  async () => {
    const response = await fetchCetegory();
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrandsAsync",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);




// get product by id from json server api
export const getProductByIdAsync = createAsyncThunk(
  "product/getProductByIdAsync",
  async (id) => {
    const response = await getProductById(id);
    return response.data;
  }
);

// for filter sort
export const getAllProductDataAsync = createAsyncThunk(
  "productgetAllProductDataAsync",
  async ({ filter, sort, pagination }) => {
    const response = await getProductsByFilters(filter, sort, pagination);
    return response.data;
  }
);

// create product silice
const productslice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cetegoris: [],
    brands: [],
    totalItems: [],
    isLoading: false,
    isError: null,
    ProductById: null,
  },
  reducers: {
    clearSelectProduct: (state) => {
      state.ProductById = null;

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductDataAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProductDataAsync.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getProductByIdAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.ProductById = action.payload;
      })
      .addCase(fetchCetegorisAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCetegorisAsync.fulfilled, (state, action) => {
        state.cetegoris = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(createProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(updateProductByIdAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProductByIdAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.product.id);
        state.products[index] = action.payload
      });
  },
});
export const { clearSelectProduct } = productslice.actions
export const selectAllProduct = (state) => state.product.products;
export const selectProduct = (state) => state.product.ProductById;
export const selectCetegoris = (state) => state.product.cetegoris;
export const selectBrands = (state) => state.product.brands;

export default productslice.reducer;
