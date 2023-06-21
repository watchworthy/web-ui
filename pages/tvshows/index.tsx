import { DownOutlined } from '@ant-design/icons';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { TvShowList } from '@watchworthy/ui';
import { Dropdown, Pagination, Space, Typography } from 'antd';
import fetchTvShows from 'api/fetch-all-tvshows';
import fetchGenres from 'api/fetch-genres';
import useTvShowsQuery from 'hooks/use-all-tvshows-query';
import useDebounce from 'hooks/use-debounce';
import { Search } from 'libs/watchworthy/src/lib/Search/Search';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useState } from 'react';
import { TvShow } from 'types/common';

const FIRST_PAGE = 1;
// const PAGE_SIZE = 20;

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

const getInitialGenreFromQuery = (query: ParsedUrlQuery) => {
  const genre = query.genre;

  if (typeof genre !== 'string') {
    return '';
  }

  return genre;
};

export const getServerSideProps: GetServerSideProps<{
  initialPage: number;
  initialSearch: string;
  initialGenre: string;
}> = async (ctx) => {
  const queryClient = new QueryClient();

  const page = getInitialPageFromQuery(ctx.query);
  const search = getInitialSearchFromQuery(ctx.query);
  const genre = getInitialGenreFromQuery(ctx.query);

  const queryKey = ['tv', page, search];
  await queryClient.prefetchQuery(queryKey, () =>
    fetchTvShows(page, search, genre)
  );

  const prefetchedQueryData = queryClient.getQueryData(queryKey);

  if (!prefetchedQueryData) {
    return {
      props: {
        initialPage: FIRST_PAGE,
        initialSearch: '',
        initialGenre: '',
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialPage: page,
      initialSearch: search,
      initialGenre: genre,
    },
  };
};

export const TvShows = ({
  initialPage,
  initialSearch,
  initialGenre,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [genre, setGenre] = useState(initialGenre);
  const router = useRouter();
  const debouncedSearch = useDebounce(search, 500);
  const debouncedGenre = useDebounce(genre, 500);
  const [selectedShows, setSelecetedShows] = useState<TvShow['id'][]>([]);
  const { data, isLoading, isError } = useTvShowsQuery(
    page,
    debouncedSearch,
    debouncedGenre
  );
  
  const [menuItems, setMenuItems] = useState<{ key: string; label: string }[]>(
    []
  );

  const handleGenreClick = (e: any) => {
    setGenre(e.key);
    setSearch('');
    setPage(FIRST_PAGE);
    setSelecetedShows([]);
  };

  useEffect(() => {
    async function getMenuItems() {
      try {
        const genres = await fetchGenres();
        const transformedItems = [
          { key: '0', label: 'All' },
          ...genres.map((genre) => ({
            key: genre.id.toString(),
            label: genre.name,
          })),
        ];
        setMenuItems(transformedItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    }

    getMenuItems();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(FIRST_PAGE);
    setSelecetedShows([]);
  };

  useEffect(() => {
    router.replace(
      `tvshows/?page=${page}${
        search || genre
          ? `&search=${debouncedSearch}&genre=${debouncedGenre}`
          : ''
      }`,
      undefined,
      { shallow: true }
    );
  }, [page, debouncedSearch, debouncedGenre]);

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
        Tv Shows
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Search
          placeholder="Search Tv Shows..."
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      <div
        style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
      >
        <Dropdown
          placement="bottomRight" // Set the placement to "bottomRight"
          menu={{
            items: menuItems,
            selectable: true,
            defaultSelectedKeys: ['3'],
            onClick: handleGenreClick,
          }}
        >
          <Typography.Link>
            <Space>
              Genre
              <DownOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
      </div>
      <TvShowList data={data} isLoading={isLoading} />
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

export default TvShows;
