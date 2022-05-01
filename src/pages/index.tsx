import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { CardList } from '../components/CardList';
import { Header } from '../components/Header';
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
    ({ pageParam = null }) => {
      // TODO GET AND RETURN NEXT PAGE PARAM
      return api.get('http://localhost:3000/api/images', {
        params: { after: pageParam },
      });
    },
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    console.log(data);
    const items = data?.pages[0].data.data;
    return items;
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList
          cards={
            formattedData || [
              {
                title: 'Doge',
                description: 'The best doge',
                url: 'https://i.ibb.co/xmj1fVB/2-DOWHILE21-1080x2560.png',
                ts: 1620222828340000,
                id: '294961059684418048',
              },
            ]
          }
        />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
