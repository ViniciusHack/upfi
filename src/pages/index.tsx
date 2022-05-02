import { Box, Button } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { CardList } from '../components/CardList';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../services/api';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    async ({ pageParam = null }) => {
      // TODO GET AND RETURN NEXT PAGE PARAM
      const response = await api.get('/api/images', {
        params: { after: pageParam },
      });
      return response;
    },
    {
      getNextPageParam: lastPage =>
        lastPage.data.after ? lastPage.data.after : null,
    },
  );

  const formattedData = useMemo(() => {
    const formattedItems = data?.pages
      .map(page => {
        return page.data.data;
      })
      .flat();
    return formattedItems;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      {console.log(hasNextPage, data)}
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {hasNextPage && (
          <Button
            mt="40px"
            onClick={() => fetchNextPage()}
            disabled={!!isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
