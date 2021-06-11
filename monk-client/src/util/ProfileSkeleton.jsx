import { Card, Skeleton } from 'antd';

const { Meta } = Card;

const style = {
  coverContainer: {
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    width: '100%',
  }
}

const ProfileSkeleton = () => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <div className='skeleton-image' style={style.coverContainer}>
          <Skeleton.Avatar active size={'large'} shape={'square'} />
        </div>
        }
      actions={[
        <Skeleton.Button active size={'small'} shape={'default'} />,
        <Skeleton.Button active size={'small'} shape={'default'} />,
        <Skeleton.Button active size={'small'} shape={'default'} />,
      ]}
    >
      <Meta
        avatar={<Skeleton.Avatar active size={'small'} shape={'circle'} />}
        title={<Skeleton.Input style={{ width: 150 }} active size={'small'} />}
        description={<Skeleton active />}
      />
    </Card>
  );
}

export default ProfileSkeleton;
