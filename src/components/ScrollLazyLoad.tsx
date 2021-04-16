import React, {
  FC,
  Fragment,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";

interface ScrollLazyLoadProps {
  children: React.ReactNode;
  loadMore: () => Promise<any>;
  hasMore: (data: any) => Boolean;
  onError?: (error: any) => void;
  renderLoading?: () => React.ReactNode;
  renderNoMore?: () => React.ReactNode;
}

const ScrollLazyLoad: FC<ScrollLazyLoadProps> = ({
  children,
  loadMore,
  hasMore,
  onError,
  renderLoading,
  renderNoMore,
}) => {
  const watch = useRef() as any;
  const [loading, setLoading] = useState(false);
  const [showNoMore, setShowNoMore] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const resp = await loadMore();
      const result = hasMore(resp);

      if (result) {
        setShowNoMore(false);
      } else {
        setShowNoMore(true);
      }
    } catch (error) {
      console.error(error);
      onError && onError(error);
    }

    setLoading(false);
  }, [loadMore, hasMore, onError]);

  const observe = useCallback(() => {
    const io = new IntersectionObserver((entries) => {
      const target = entries[0];

      if (target.intersectionRatio <= 0) return;

      load();
    });

    // 开始观察
    io.observe(watch.current);

    return () => {
      // 关闭观察器
      io.disconnect();
    };
  }, []);

  const renderLoadingEle = useCallback(() => {
    if (loading && renderLoading) {
      return renderLoading();
    } else if (loading && !renderLoading) {
      return <div>Loading...</div>;
    } else {
      return null;
    }
  }, [loading, renderLoading]);

  const renderNoMoreEle = useCallback(() => {
    if (!loading && showNoMore && renderNoMore) {
      return renderNoMore();
    } else if (!loading && showNoMore && !renderNoMore) {
      return <div>暂无更多数据</div>;
    } else {
      return null;
    }
  }, [loading, showNoMore, renderNoMore]);

  useEffect(() => {
    observe();
  }, []);

  return (
    <Fragment>
      {children}
      <div ref={watch} />
      {renderLoadingEle()}
      {renderNoMoreEle()}
    </Fragment>
  );
};

export default ScrollLazyLoad;
