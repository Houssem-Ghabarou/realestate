import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import propertyService from "../services/propertyService";

const initialState = {
  lastSixProperties: [],
  lastSixVenteProperties: [],
  lastSixLocationProperties: [],
  propByCategoryType: [],
  vente: [],
  location: [],
  propertyDetails: [],
  wishlist: [],
  loading: false,
  error: null,
  success: false,
  message: "",
};

export const getLastSixProperties = createAsyncThunk(
  "property/getLastSixProperties",
  async (_, thunkAPI) => {
    try {
      return await propertyService.getLastSixProperties();
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
export const getLastSixVenteProperties = createAsyncThunk(
  "property/getLastSixVenteProperties",
  async (_, thunkAPI) => {
    try {
      return await propertyService.getLastSixVenteProperties();
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
export const getLastSixLocationProperties = createAsyncThunk(
  "property/getLastSixLocationProperties",
  async (_, thunkAPI) => {
    try {
      return await propertyService.getLastSixLocationProperties();
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
export const getPropByCategoryType = createAsyncThunk(
  "property/getPropByCategoryType",
  async (category, type, thunkAPI) => {
    try {
      return await propertyService.getPropByCategoryType(category, type);
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
      .addCase(getLastSixProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLastSixProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.lastSixProperties = action.payload;
      })
      .addCase(getLastSixProperties.rejected, (state, action) => {
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
      })
      .addCase(getLastSixVenteProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLastSixVenteProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.lastSixVenteProperties = action.payload;
      })
      .addCase(getLastSixVenteProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getLastSixLocationProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLastSixLocationProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.lastSixLocationProperties = action.payload;
      })
      .addCase(getLastSixLocationProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getPropByCategoryType.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPropByCategoryType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.propByCategoryType = action.payload;
      })
      .addCase(getPropByCategoryType.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export default propertySlice.reducer;
