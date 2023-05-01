import { dehydrate, QueryClient } from '@tanstack/react-query';
import { MovieList } from '@watchworthy/ui';
import { Pagination } from 'antd';
import fetchCharacters from 'api/fetch-all-movies';
import useCharactersQuery from 'hooks/use-all-movies-query';
import useDebounce from 'hooks/use-debounce';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
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
  const queryKey = ['movies', page, search];
  await queryClient.prefetchQuery(queryKey, () =>
    fetchCharacters(page, search)
  );

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

export const Movies = ({
  initialPage,
  initialSearch,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search, 500);
  const router = useRouter();
  const { data, isLoading, isFetching, isError } = useCharactersQuery(
    page,
    debouncedSearch
  );

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong!</div>;

  if (!data) return null;

  return (
    <>
      <h1>Movies</h1>
      <MovieList data={data} isLoading={isLoading} />
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

export default Movies;
