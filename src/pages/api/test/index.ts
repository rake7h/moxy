import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const queries = req.query;
  const body = req.body;

  /** Get test */
  if (req.method === 'GET') {
    if (queries.op === '1') {
      return res.status(200).send('1');
    }

    if (queries.op === '2') {
      return res.status(200).send('2');
    }

    return res.status(200).send('get');
  }

  /** POST test */
  if (req.method === 'POST') {
    return res.status(200).send(body);
  }
};

export default handler;
