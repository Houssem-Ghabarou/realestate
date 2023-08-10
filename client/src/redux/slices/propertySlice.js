import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import propertyService from "../services/property";

const initialState = {
  properties: [],
  vente: [],
  location: [],
  propertyDetails: [],
  wishlist:[],
  loading: false,
  error: null,
  message: "",
};

export const getAllProperties = createAsyncThunk(
  "property/getAll",
  async (_, thunkAPI) => {
    try {
      return await propertyService.getAllProperties();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllvente = createAsyncThunk(
  "property/getAllvente",
  async (_, thunkAPI) => {
    try {
      return await propertyService.getAllvente();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAlllocation = createAsyncThunk(
  "property/getAlllocation",
  async (_, thunkAPI) => {
    try {
      return await propertyService.getAlllocation();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPropertyDetails = createAsyncThunk(
  "property/getPropertyDetails",
  async (propId, thunkAPI) => {
    try {
      return await propertyService.getPropertyDetails(propId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const propertySlice = createSlice({
  name: "property", // Changed "proeprty" to "property"
  initialState: initialState, // Corrected the property name
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.properties = action.payload;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getAlllocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAlllocation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.location = action.payload;
      })
      .addCase(getAlllocation.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getAllvente.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllvente.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.vente = action.payload;
      })
      .addCase(getAllvente.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getPropertyDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPropertyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.propertyDetails = action.payload;
      })
      .addCase(getPropertyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export default propertySlice.reducer;
