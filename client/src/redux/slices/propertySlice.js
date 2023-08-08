import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import propertyService from "../services/property";

const initialState = {
  properties: null,
  vente: null,
  location: null,
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
      });
  },
});

export default propertySlice.reducer;
