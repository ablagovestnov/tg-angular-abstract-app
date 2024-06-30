import express, { Request, Response ,ErrorRequestHandler, RequestHandler } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { validate, parse, type InitDataParsed } from '@tma.js/init-data-node';


/**
 * Sets init data in the specified Response object.
 * @param res - Response object.
 * @param initData - init data.
 */
function setInitData(res: Response, initData: InitDataParsed): void {
  res.locals.initData = initData;
}

/**
 * Extracts init data from the Response object.
 * @param res - Response object.
 * @returns Init data stored in the Response object. Can return undefined in case,
 * the client is not authorized.
 */
function getInitData(res: Response): InitDataParsed | undefined {
  return res.locals.initData;
}

/**
 * Middleware which authorizes the external client.
 * @param req - Request object.
 * @param res - Response object.
 * @param next - function to call the next middleware.
 */
const authMiddleware: RequestHandler = (req, res, next) => {
  // We expect passing init data in the Authorization header in the following format:
  // <auth-type> <auth-data>
  // <auth-type> must be "tma", and <auth-data> is Telegram Mini Apps init data.
  const [authType, authData = ''] = (req.header('authorization') || '').split(' ');
  switch (authType) {
    case 'tma':
      try {
        // Validate init data.
        validate(authData, token, {
          // We consider init data sign valid for 1 hour from their creation moment.
          expiresIn: 3600,
        });

        // Parse init data. We will surely need it in the future.
        setInitData(res, parse(authData));
        return next();
      } catch (e) {
        return next(e);
      }
      // ... other authorization methods.
    default:
      return next(new Error('Unauthorized'));
  }
};

/**
 * Middleware which shows the user init data.
 * @param _req
 * @param res - Response object.
 * @param next - function to call the next middleware.
 */
const showInitDataMiddleware: RequestHandler = (_req, res, next) => {
  const initData = getInitData(res);
  if (!initData) {
    return next(new Error('Cant display init data as long as it was not found'));
  }
  res.json(initData);
};

/**
 * Middleware which displays the user init data.
 * @param err - handled error.
 * @param _req
 * @param res - Response object.
 */
const defaultErrorMiddleware: ErrorRequestHandler = (err, _req, res) => {
  res.status(500).json({
    error: err.message,
  });
};

// Your secret bot token.
const token = '7012022502:AAG6rOFhryq0xE8NKZ5pe0ZN3n5Fsee4grs';

const app = express();
const port = 3000;
app.use(cors());

app.use(authMiddleware);
// frontend.get('/', showInitDataMiddleware);
// frontend.use(defaultErrorMiddleware);

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tg-angular-abstract-mongo')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define the TestData model
interface ITestData extends mongoose.Document {
  name: string;
  userId: string;
}

const TestData = mongoose.model<ITestData>('TestData', new mongoose.Schema({ name: String, userId: String }));

// Routes
app.get('/api/test-data', async (req: Request, res: Response) => {
  try {
    const userId = res.locals?.initData?.user?.id || 'test'
    console.log('res.locals', res.locals)
    const testDataItems = await TestData.find({userId});
    res.json(testDataItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.post('/api/test-data', async (req: Request, res: Response) => {
  try {
    const userId = res.locals?.initData?.user?.id || 'test'
    const testDataItem = new TestData({
      userId,
      ...req.body
    });
    await testDataItem.save();
    res.status(201).json(testDataItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create test data' });
  }
});


process.on('uncaughtException', (err: Error) => {
  console.error('Unhandled Exception', err);
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('Unhandled Rejection', reason);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
