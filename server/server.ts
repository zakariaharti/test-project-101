/* modules dependencies */
import * as express from 'express';
import * as morgan from 'morgan';
import * as cors  from "cors";
import * as helmet from 'helmet';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as mongoose from 'mongoose';
import * as chalk from 'chalk';
import * as errorHandler from 'errorhandler';

// env variables
require('dotenv').config();

// express intance
const app = express();

// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;

// connect to MongoDB
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/test_project');
  } catch(error){
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.default.red('X'));
    process.exit();
  }
})();

/**
  * express configuration
  */
app.set('port', process.env.PORT || 8000);
app.set('host', process.env.HOST || 'localhost');
app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());
app.use(helmet());

/**
  * application routes
  */

/**
 * Error Handler.
 */
if (isDevMode) {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((
    err: express.Errback,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    res.status(500).send({
      err
    });
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  // @ts-ignore
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});

module.exports = app;
