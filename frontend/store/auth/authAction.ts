import { authService } from "./authService";
import { useAuthStore } from "./authStore";
import type { SignupPayload, SigninPayload } from "./auth.types";

export const authActions = {
  signup: async (data: SignupPayload) => {
    try {
      const res = await authService.signup(data);

      // Nếu muốn tự động login sau khi signup (optional)
      // useAuthStore.getState().setUser(res.user);

      return res;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  signin: async (data: SigninPayload) => {
    try {
      const res = await authService.signin(data);

      const store = useAuthStore.getState();
      console.log(res)
      store.setUser(res.user);
      store.setAccessToken(res.accessToken);

      localStorage.setItem("accessToken", res.accessToken);

      return res;
    } catch (error) {
      console.error("Signin error:", error);
      throw error;
    }
  },

  signout: async () => {
    try {
      await authService.signout();
      useAuthStore.getState().clearAuth();
    } catch (error) {
      console.error("Signout error:", error);
      throw error;
    }
  },
};
