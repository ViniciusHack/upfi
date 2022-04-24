import { Box } from '@chakra-ui/react';
import { CardList } from '../components/CardList';
import { Header } from '../components/Header';

export default function Home(): JSX.Element {
  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   isFetchingNextPage,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useInfiniteQuery(
  //   'images',
  //   // TODO AXIOS REQUEST WITH PARAM
  //   ,
  //   // TODO GET AND RETURN NEXT PAGE PARAM
  // );

  // const formattedData = useMemo(() => {
  //   // TODO FORMAT AND FLAT DATA ARRAY
  // }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN
  const mockData = [
    {
      title: 'Doge',
      description: 'The best doge',
      url: 'https://i.ibb.co/K6DZdXc/minh-pham-LTQMgx8t-Yq-M-unsplash.jpg',
      ts: 1620222828340000,
      id: '1',
    },
    {
      title: 'Doge',
      description: 'The best doge',
      url: 'https://i.ibb.co/K6DZdXc/minh-pham-LTQMgx8t-Yq-M-unsplash.jpg',
      ts: 1620222828380000,
      id: '2',
    },
    {
      title: 'Doge',
      description: 'The best doge',
      url: 'https://i.ibb.co/K6DZdXc/minh-pham-LTQMgx8t-Yq-M-unsplash.jpg',
      ts: 1620222828340000,
      id: '3',
    },
    {
      title: 'Doge',
      description: 'The best doge',
      url: 'https://i.ibb.co/K6DZdXc/minh-pham-LTQMgx8t-Yq-M-unsplash.jpg',
      ts: 1620222828310000,
      id: '4',
    },
  ];

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={mockData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
