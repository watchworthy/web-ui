const EmptyPage = () => {
  return null;
};

export default EmptyPage;

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: '/movie/1',
      permanent: true,
    },
  };
};
