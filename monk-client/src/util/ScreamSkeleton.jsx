import { Skeleton } from 'antd';

const ScreamSkeleton = () => {
  return (
    <>
      <Skeleton avatar active paragraph={{ rows: 3 }} />
      <Skeleton avatar active paragraph={{ rows: 3 }} />
    </>
  );
}

export default ScreamSkeleton;