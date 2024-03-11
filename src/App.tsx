import { useEffect, useState } from "react";
import "./App.css";
import Select, { MultiValue } from "react-select";
import { useQuery } from "react-query";
import useStore from "./store";
function App() {
  const [, setValue] = useState<
    { value: number; label: string; category: string }[] | []
  >([]);

  const result = useStore((state: { result: string | number }) => state.result);
  // const Sum = useStore(
  //   (state: { Sum: (items: Array<{ value: number }>) => void }) => state.Sum
  // );

  const Multiply = useStore(
    (state: { Multiply: (items: Array<{ value: number }>) => void }) =>
      state.Multiply
  );

  const getData = async () => {
    const res = await fetch(import.meta.env.VITE_API);
    const data = await res.json();
    setValue(data);
    return data;
  };
  const { data, refetch } = useQuery("getData", getData);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className="container">
      <details className="new-formula">
        <summary className="new-formula-summary">
          New Formula <br />
          <br />
          <span className="result">${result}</span>
        </summary>
        <Select
          isMulti
          loadingMessage={() => <span>Loading...</span>}
          backspaceRemovesValue
          escapeClearsValue
          placeholder=""
          options={data}
          getOptionLabel={(opt: { name: string; category: string }) =>
            `${opt.name}`
          }
          getOptionValue={(opt: {
            value: number;
            name: string;
            category: string;
          }) => opt.value.toString()}
          onChange={(
            opt: MultiValue<{ name: string; value: number; category: string }>
          ) => {
            setValue(opt as []);
            Multiply(opt as []);
          }}
        />
      </details>
    </div>
  );
}

export default App;
