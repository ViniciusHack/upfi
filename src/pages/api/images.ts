import fauna from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';

const { query } = fauna;
const client = new fauna.Client({
  secret: process.env.FAUNA_API_KEY as string,
  domain: 'db.us.fauna.com',
});

interface ImagesQueryResponse {
  after?: {
    id: string;
  };
  data: {
    data: {
      title: string;
      description: string;
      url: string;
    };
    ts: number;
    ref: {
      id: string;
    };
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === 'POST') {
    const { url, title, description } = req.body;

    return client
      .query(
        query.Create(query.Collection('images'), {
          data: {
            title,
            description,
            url,
          },
        }),
      )
      .then(() => {
        return res.status(201).json({ success: true });
      })
      .catch(err =>
        res
          .status(501)
          .json({ error: `Sorry something Happened! ${err.message}` }),
      );
  }

  if (req.method === 'GET') {
    const { after } = req.query;

    const mockData = [
      {
        title: 'Doge',
        description: 'The best doge',
        url: 'https://i.ibb.co/xmj1fVB/2-DOWHILE21-1080x2560.png',
        ts: 1620222828340000,
        id: '294961059684418048',
      },
      {
        title: 'Cachorrinho gif',
        description: 'A Gracie é top',
        url: 'https://i.ibb.co/r3NbmgH/ezgif-3-54a30c130cef.gif',
        ts: 1620222856980000,
        id: '295991055792210435',
      },
      {
        title: 'React',
        description: 'Dan Abramov',
        url: 'https://i.ibb.co/gjsyJvJ/2-DOWHILE21-1400x900.png',
        ts: 1620223108460000,
        id: '295991069654385154',
      },
      {
        title: 'Ignite',
        description: 'Wallpaper Celular',
        url: 'https://i.ibb.co/DbfGQW5/1080x1920.png',
        ts: 1620223119610000,
        id: '295991085899973123',
      },
      {
        title: 'Ignite',
        description: 'Wallpaper PC 4k',
        url: 'https://i.ibb.co/fvYLKFn/3840x2160.png',
        ts: 1620223133800000,
        id: '295991107279389188',
      },
      {
        title: 'Paisagem',
        description: 'Sunset',
        url: 'https://i.ibb.co/st42sNz/petr-vysohlid-9fqw-Gq-GLUxc-unsplash.jpg',
        ts: 1620223149390000,
        id: '295991128736399874',
      },
    ];

    const queryOptions = {
      size: 6,
      ...(after && { after: query.Ref(query.Collection('images'), after) }),
    };

    return client
      .query<ImagesQueryResponse>(
        query.Map(
          query.Paginate(
            query.Documents(query.Collection('images')),
            queryOptions,
          ),
          query.Lambda('X', query.Get(query.Var('X'))),
        ),
      )
      .then(response => {
        const formattedData = response.data.map(item => ({
          ...item.data,
          ts: item.ts,
          id: item.ref.id,
        }));

        // return res.json({
        //   data: formattedData,
        //   after: response.after ? response.after[0].id : null,
        // }); to uncomment later
        return res.json(mockData);
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json(err);
      });
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}
