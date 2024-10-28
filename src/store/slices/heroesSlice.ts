import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../types/Card";
import client from "../../api/apiClient";

interface initialStateType {
  heroes: {
    data: Card[];
    isLoading: boolean;
    isError: boolean;
  },
  hero: Card | null,
}

const initialState: initialStateType = {
  heroes: {
    data: [],
    isLoading: false,
    isError: false,
  },
  hero: null,
};

export const getAllHeroes = createAsyncThunk<Card[]>(
  "heroes/getAllHeroes",
  async () => {
    try {
      const response = await client.get("/");
      return response.data;
    } catch (error) {
      console.debug(error);
    }
  }
);

export const getOneHero = createAsyncThunk<Card, string>(
  "heroes/getOneHero",
  async (id) => {
    try {
      const response = await client.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.debug(error);
    }
  }
);

export const deleteHero = createAsyncThunk<Card, string>('heroes/deleteHero', async (id) => {
  try {
    const response = await client.delete(id);
    return response.data;
  } catch (error) {
    console.debug(error);
  }
})

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    // info: get all heroes from DB;
      .addCase(getAllHeroes.pending, (state) => {
        state.heroes.data = [];
        state.heroes.isError = false;
        state.heroes.isLoading = true;
      })
      .addCase(
        getAllHeroes.fulfilled,
        (state, action: PayloadAction<Card[]>) => {
          state.heroes.data = action.payload;
          state.heroes.isError = false;
          state.heroes.isLoading = false;
        }
      )
      .addCase(getAllHeroes.rejected, (state) => {
        state.heroes.data = [];
        state.heroes.isError = true;
        state.heroes.isLoading = false;
      }
    )
    // info: get one hero from DB;
      .addCase(
        getOneHero.fulfilled,
        (state, action: PayloadAction<Card>) => {
          state.hero = action.payload;
        }
    )
      // info: delete hero;
      .addCase(deleteHero.pending, (state) => {
        state.heroes.isError = false;
        state.heroes.isLoading = true;
      })
      .addCase(deleteHero.fulfilled, (state, action: PayloadAction<Card>) => {
        state.heroes.data = state.heroes.data.filter(item => item._id != action.payload._id);
        state.heroes.isError = false;
        state.heroes.isLoading = false;
      })
      .addCase(deleteHero.rejected, (state) => {
        state.heroes.isError = true;
        state.heroes.isLoading = false;
      })
  },
});

export default heroesSlice.reducer;
