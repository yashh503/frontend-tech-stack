import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jsonConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
const AuthjsonConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    credentials: "include",
  },
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payloadData: any, { rejectWithValue }) => {
    try {
      const login = await axios.post(
        "https://dummyjson.com/user/login",
        payloadData,
        jsonConfig
      );
      if (login.status === 200) {
        console.log(login ,"success");
        localStorage.setItem("authToken", login.data.accessToken);
        console.log(login);
        return login;
      }
    } catch (error) {
      console.error("her er is error", error);
      return rejectWithValue(error || "Something went wrong.");
    }
  }
);

export const loadProfile = createAsyncThunk("auth/profile", async () => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/user/me",
      AuthjsonConfig
    );

    return response;
  } catch (error: any) {
    logoutUser();
    return error.response?.data?.message || "Failed to load profile";
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.removeItem("authToken");
  } catch (error: any) {
    console.log(error);
  }
});
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        console.log("first", state), (state.isAuthenticated = false);
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log(action?.payload);
        if (action?.payload?.status === 200) {
          state.user = action.payload.data;
          state.isLoading = false;
          state.isAuthenticated = true;
        } else {
          state.errorMessage =
            action?.payload?.data?.message || "Something went wrong.";
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        console.log("third", state), (state.isLoading = false);
        state.isError = true;
        console.error(action.error);
      })
      .addCase(loadProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(loadProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error(action.error);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
