import React, { useCallback, useState, useRef } from "react";
import ScrollLazyLoad from "../components/ScrollLazyLoad";

const arr = Array(50).fill("test");

const Example = () => {
  const container = useRef() as any;
  const [rows, setRows] = useState(arr);

  const loadMore = useCallback(() => {
    const newRows = [...rows].concat(Array(10).fill("test"));
    return new Promise((resolve) => {
      setTimeout(() => {
        setRows(newRows);
        const randow = Math.random();
        if (randow > 0.5) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }, [rows]);

  const hasMoreOrNot = useCallback((data) => {
    return data;
  }, []);

  return (
    <div style={{ height: "600px", overflow: "auto" }} ref={container}>
      <ScrollLazyLoad
        loadMore={loadMore}
        hasMore={hasMoreOrNot}
        intersectionConfig={{
          root: container.current,
          rootMargin: "100px",
        }}
      >
        {rows.map((item, index) => {
          return <div key={index}>这是第{index + 1}行</div>;
        })}
      </ScrollLazyLoad>
    </div>
  );
};

export default Example;
