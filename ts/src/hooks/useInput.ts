import { useState, useCallback } from "react";

const useInput = (initialValue: string = "") => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue] as const;
};

export default useInput;
