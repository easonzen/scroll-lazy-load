import React, { useCallback, useState } from "react";
import ScrollLazyLoad from "../components/ScrollLazyLoad";

const arr = Array(50).fill("test");

const Example = () => {
  const [rows, setRows] = useState(arr);

  const loadMore = useCallback(() => {
    const newRows = [...rows].concat(Array(10).fill("test"));
    return new Promise((resolve) => {
      setTimeout(() => {
        setRows(newRows);
        resolve(true);
      }, 1000);
    });
  }, [rows]);

  const hasMoreOrNot = useCallback((data) => {
    return data;
  }, []);

  return (
    <ScrollLazyLoad loadMore={loadMore} hasMore={hasMoreOrNot}>
      {rows.map((item, index) => {
        return <div key={index}>这是第{index + 1}行</div>;
      })}
    </ScrollLazyLoad>
  );
};

export default Example;
