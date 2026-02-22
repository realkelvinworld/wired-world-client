import { persist } from "zustand/middleware";
import { UserModel } from "@/models/user";
import { create } from "zustand";
import { produce } from "immer";

interface UserState {
  user: UserModel | null;
  setUser: (user: UserModel) => void;
  updateUser: (updater: (draft: UserModel) => void) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserModel) => set({ user }),
      updateUser: (updater) =>
        set(
          produce((state: UserState) => {
            if (state.user) updater(state.user);
          }),
        ),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user",
    },
  ),
);
