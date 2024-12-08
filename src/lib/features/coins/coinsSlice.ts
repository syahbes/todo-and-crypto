import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { Coin } from "@/types";

export interface CoinsState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
}

const initialState: CoinsState = {
  coins: [],
  loading: false,
  error: null,
};

export const fetchCoinsAsync = createAsyncThunk(
  "coins/fetchCoins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/crypto");
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error);
      }

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
        state.error = null;
      })
      .addCase(fetchCoinsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectCoins = (state: RootState) => state.coins.coins;
export const selectCoinsLoading = (state: RootState) => state.coins.loading;
export const selectCoinsError = (state: RootState) => state.coins.error;

export default coinsSlice.reducer;
