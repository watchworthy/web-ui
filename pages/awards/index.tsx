import { AwardList } from 'libs/watchworthy/src/lib/AwardList';
import fetchAwards from 'api/fetch-all-awards';
import { AwardsQuery } from 'api/fetch-all-awards';
import { GetServerSideProps } from 'next';
interface AwardsProps {
  awards: AwardsQuery;
}

export const getServerSideProps: GetServerSideProps<AwardsProps> = async (
  context: NextPageContext
) => {
  // Fetch the list of awards
  const res = await fetchAwards();
  const awards = await res;

  return { props: { awards } };
};

export const Awards = ({ awards }: AwardsProps) => {
  return (
    <>
      <h1>Award List</h1>
      <AwardList data={awards} isLoading={false} />
    </>
  );
};

export default Awards;