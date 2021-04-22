# scroll-lazy-load

## 描述

滚动加载组件

### ScrollLazyLoad Props

| 属性名             | 类型                                     | 是否必填 | 描述                     | 默认值                  |
| ------------------ | ---------------------------------------- | -------- | ------------------------ | ----------------------- |
| loadMore           | () => Promise                            | 是       | 加载更多函数             | -                       |
| hasMore            | (data: any) => Boolean                   | 是       | 是否还有更多数据需要加载 | -                       |
| onError            | (data: any) => Boolean                   | 否       | loadMore 请求报错函数    | -                       |
| renderLoading      | () => React.ReactNode 或 React.ReactNode | 否       | 加载过程中 loading 展示  | <div>Loading...</div>   |
| renderNoMore       | () => React.ReactNode 或 React.ReactNode | 否       | 无更多数据需要加载展示   | <div>暂无更多数据</div> |
| intersectionConfig | IntersectionConfig                       | 否       | 详见 IntersectionConfig  | <div>暂无更多数据</div> |

### IntersectionConfig

| 属性名     | 类型                        | 是否必填 | 描述             | 默认值                    |
| ---------- | --------------------------- | -------- | ---------------- | ------------------------- |
| root       | Element 、 Document 、 null | 否       | 滚动区域的根节点 | ScrollLazyLoad 组件父节点 |
| rootMargin | string                      | 否       |  滚动区域 margin | -                         |

**注：root, rootMargin 参数同 [Intersection Observer](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)**

##例子

```js
import React, { useCallback, useState, useRef } from "react";
import ScrollLazyLoad from "scroll-lazy-load";

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
```
