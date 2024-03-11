import create, { GetState, SetState } from "zustand";

interface Store {
  result: string | number;
  operands: string[];
  Sum: (items: Array<{ value: number }>) => void;
  Multiply: (items: Array<{ value: number }>) => void;
}

const useStore = create<Store>(
  (set: SetState<Store>, get: GetState<Store>) => ({
    result: 0,
    operands: ["+", "-", "*", "/"],
    returnResult: () => {
      return get().result;
    },
    Sum: (items: Array<{ value: number }>) => {
      set({ result: items.reduce((acc, item) => acc + item.value, 0) });
    },
    Multiply: (items: Array<{ value: number }>) => {
      set({ result: items.reduce((acc, item) => acc * item.value, 1) });
    },
  })
);

export default useStore;
