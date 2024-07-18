import { create } from "zustand";

type RouteStore = {
  route: string;
  selectedRoute: (route: string) => void;
};

const useRouteStore = create<RouteStore>((set) => ({
  route: "Login",
  selectedRoute: (route) => set({ route }),
}));

export default useRouteStore;
