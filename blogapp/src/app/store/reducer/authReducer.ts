// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { api } from "../../service/api";

// interface AuthState {
//   accessToken: string;
//   isAuthenticated: boolean;
//   loading: boolean;
// }

// // ✅ Initialize state without accessing `localStorage` directly
// const initialState: AuthState = {
//   accessToken: "",
//   isAuthenticated: false,
//   loading: true,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
//       state.loading = action.payload.loading;
//     },

//     setTokens: (state, action: PayloadAction<{ accessToken: string }>) => {
//       state.accessToken = action.payload.accessToken;
//       state.isAuthenticated = true;
//       if (typeof window !== "undefined") {
//         localStorage.setItem("access_token", action.payload.accessToken);
//       }
//     },

//     resetTokens: (state) => {
//       state.accessToken = "";
//       state.isAuthenticated = false;
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("access_token");
//       }
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
//         const data = action.payload;
//         state.accessToken = data.jwt;
//         state.isAuthenticated = true;
//         state.loading = false;
//         if (typeof window !== "undefined") {
//           localStorage.setItem("access_token", data.jwt);
//         }
//       })
//       .addMatcher(api.endpoints.login.matchRejected, (state) => {
//         state.accessToken = "";
//         state.isAuthenticated = false;
//         state.loading = false;
//       })
//       .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
//         state.accessToken = "";
//         state.isAuthenticated = false;
//         state.loading = false;
//         if (typeof window !== "undefined") {
//           localStorage.removeItem("access_token");
//         }
//       });
//   },
// });

// export const { setLoading, setTokens, resetTokens } = authSlice.actions;
// export default authSlice.reducer;
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/api";

// ✅ Function to get access token safely
const getStoredAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token") ?? "";
  }
  return "";
};

// ✅ Define Auth State
interface AuthState {
  accessToken: string;
  isAuthenticated: boolean;
  loading: boolean;
}

// ✅ Define Initial State (Load token from `localStorage`)
const initialState: AuthState = {
  accessToken: getStoredAccessToken(),
  isAuthenticated: Boolean(getStoredAccessToken()), // ✅ Check if token exists
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },

    // ✅ Store only `accessToken`
    setTokens: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", action.payload.accessToken);
      }
    },

    // ✅ Clear tokens on logout
    resetTokens: (state) => {
      state.accessToken = "";
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
      }
    },
  },

  // ✅ Handle login/logout API calls
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        const data = action.payload;
        state.accessToken = data.jwt;
        state.isAuthenticated = true;
        state.loading = false;
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", data.jwt);
        }
      })
      .addMatcher(api.endpoints.login.matchRejected, (state) => {
        state.accessToken = "";
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
        state.accessToken = "";
        state.isAuthenticated = false;
        state.loading = false;
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
        }
      });
  },
});

export const { setLoading, setTokens, resetTokens } = authSlice.actions;
export default authSlice.reducer;
