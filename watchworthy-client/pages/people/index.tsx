import { dehydrate, QueryClient } from '@tanstack/react-query';
import { PersonList, useUser } from '@watchworthy/ui';
import { Pagination } from 'antd';
import fetchPeople from 'api/fetch-all-people';
import usePeopleQuery from 'hooks/use-all-people-query';
import useDebounce from 'hooks/use-debounce';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useState } from 'react';

const FIRST_PAGE = 1;
const PAGE_SIZE = 20;

const getInitialPageFromQuery = (query: ParsedUrlQuery) => {
  const page = Number(query.page);

  if (Number.isNaN(page) || page < FIRST_PAGE) {
    return FIRST_PAGE;
  }

  return page;
};

const getInitialSearchFromQuery = (query: ParsedUrlQuery) => {
  const search = query.search;

  if (typeof search !== 'string') {
    return '';
  }

  return search;
};

export const getServerSideProps: GetServerSideProps<{
  initialPage: number;
  initialSearch: string;
}> = async (ctx) => {
  const queryClient = new QueryClient();

  const page = getInitialPageFromQuery(ctx.query);
  const search = getInitialSearchFromQuery(ctx.query);
  const queryKey = ['people', page, search];
  await queryClient.prefetchQuery(queryKey, () => fetchPeople(page, search));

  const prefetchedQueryData = queryClient.getQueryData(queryKey);

  if (!prefetchedQueryData) {
    return {
      props: {
        initialPage: FIRST_PAGE,
        initialSearch: '',
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialPage: page,
      initialSearch: search,
    },
  };
};

export const People = ({
  initialPage,
  initialSearch,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const user = useUser();
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, isFetching, isError } = usePeopleQuery(
    page,
    debouncedSearch
  );

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong!</div>;

  if (!data) return null;

  return (
    <>
      <h1>People</h1>
      <PersonList data={data} isLoading={isLoading} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
        }}
      >
        <div></div>
        <div>
          <Pagination
            defaultCurrent={1}
            total={data.total}
            onChange={(pageNumber) => setPage(pageNumber)}
            pageSize={24}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  );
};

export default People;
