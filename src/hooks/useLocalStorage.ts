import { useState } from 'react';

function testGame(value: string) : string {
  return value;
}

// Custom hook useLocalStorage
function useLocalStorage<T>(key: string, initialValue : T): [T, (value: T) => void] {
  // Kiểm tra nếu có giá trị trong localStorage, nếu không thì sử dụng giá trị mặc định
  const storedValue = localStorage.getItem(key);

  // Nếu có giá trị trong localStorage, sử dụng giá trị đó, nếu không thì dùng giá trị mặc định
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initial);

  // Lưu giá trị vào localStorage khi state thay đổi
  const setLocalStorageValue = (newValue: T): void => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue)); // Lưu giá trị vào localStorage
  };

  return [value, setLocalStorageValue];
}

export default useLocalStorage;
