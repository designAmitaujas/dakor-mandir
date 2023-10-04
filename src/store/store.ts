import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IUserInfo {
  isAuth: boolean;

  username: string;

  isAdmin: boolean;
}

interface AppState {
  userInfo: IUserInfo;
  setAuthTrue: (arg0: IUserInfo) => void;
  setAuthFalse: () => void;
}

export const useAppState = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        userInfo: {
          username: "",

          isAdmin: false,
          isAuth: false,
        },
        setAuthTrue: (arg0) =>
          set((state) => ({
            userInfo: arg0,
          })),
        setAuthFalse: () =>
          set((state) => ({
            userInfo: {
              username: "",

              isAdmin: false,
              isAuth: false,
            },
          })),
      }),
      {
        name: "bear-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
