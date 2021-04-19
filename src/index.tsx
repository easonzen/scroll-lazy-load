import React, {
  FC,
  Fragment,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";

export interface IntersectionConfig {
  root?: Element | Document | null;
  rootMargin?: string;
}

export interface ScrollLazyLoadProps {
  children: React.ReactNode;
  loadMore: () => Promise<any>;
  hasMore: (data: any) => Boolean;
  onError?: (error: any) => void;
  renderLoading?: () => React.ReactNode;
  renderNoMore?: () => React.ReactNode;
  intersectionConfig?: IntersectionConfig;
}

const ScrollLazyLoad: FC<ScrollLazyLoadProps> = ({
  children,
  loadMore,
  hasMore,
  onError,
  renderLoading,
  renderNoMore,
  intersectionConfig,
}) => {
  const watch = useRef() as any;
  const [loading, setLoading] = useState(false);
  const [showNoMore, setShowNoMore] = useState(false);

  const load = useCallback(async () => {
    if (showNoMore || loading) {
      return;
    }

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
  }, [loadMore, hasMore, onError, showNoMore, loading]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      const target = entries[0];

      if (target.intersectionRatio <= 0) return;

      load();
    }, intersectionConfig);

    // 开始观察
    io.observe(watch.current);

    return () => {
      // 关闭观察器
      io.disconnect();
    };
  }, [load]);

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
