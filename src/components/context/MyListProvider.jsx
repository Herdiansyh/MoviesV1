import React, { useState, useEffect } from "react";
import { MyListContext } from "./MyListContext";

export function MyListProvider({ children }) {
  const [myList, setMyList] = useState(() => {
    // ambil data dari localStorage saat pertama kali load
    const stored = localStorage.getItem("myList");
    return stored ? JSON.parse(stored) : [];
  });

  // simpan ke localStorage setiap kali myList berubah
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  const addToMyList = (movie) => {
    if (!myList.some((m) => m.id === movie.id)) {
      setMyList([...myList, movie]);
    }
  };

  const removeFromMyList = (id) => {
    setMyList(myList.filter((m) => m.id !== id));
  };

  return (
    <MyListContext.Provider value={{ myList, addToMyList, removeFromMyList }}>
      {children}
    </MyListContext.Provider>
  );
}
