import { dehydrate, QueryClient } from '@tanstack/react-query';
import { PersonList, useUser } from '@watchworthy/ui';
import { Pagination } from 'antd';
import fetchPeople from 'api/fetch-all-people';
import usePeopleQuery from 'hooks/use-all-people-query';
import useDebounce from 'hooks/use-debounce';
import { Search } from 'libs/watchworthy/src/lib/Search/Search';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useState } from 'react';
import { People as PeopleType } from 'types/common';

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
  const [selectedPeople, setSelectedPeople] = useState<PeopleType['id'][]>([]);
  const router = useRouter();
  const user = useUser();
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, isFetching, isError } = usePeopleQuery(
    page,
    debouncedSearch
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(FIRST_PAGE);
    setSelectedPeople([]);
  };

  useEffect(() => {
    router.replace(
      `people/?page=${page}${search ? `&search=${debouncedSearch}` : ''}`,
      undefined,
      { shallow: true }
    );
  }, [page, debouncedSearch]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong!</div>;

  if (!data) return null;

  return (
    <>
      <h1
        style={{
          display: 'flex',
        }}
      >
        People
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Search
          placeholder="Search People..."
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
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
