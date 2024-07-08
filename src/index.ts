import { ApiExpress } from './api/express/api.express';
import GoogleSheetsController from './controllers/GoogleSheetController';
import UserController from './controllers/UserController';
import connectToDatabase from './mongooseDatabase/mongooseConnection';
import { BcryptHashProvider } from './providers/implementations/BcryptHashProvider';
import SheetAuthProvider from './providers/implementations/SheetsAuthProvider';
import SheetRepositoryImplementation from './repositories/implementations/SheetsRepositoryImplementation';
import { UserRepositoryImplementation } from './repositories/implementations/UserRepositoryImplementation';

import { SheetsRoutesImplementation } from './routes/implementations/SheetsRoutesImplementation';
import { UserRoutesImplementation } from './routes/implementations/UserRoutesImplementation';
import SheetsServiceImplementation from './services/implementations/SheetsServiceImplementation';
import { UserServiceImplementation } from './services/implementations/UserServiceImplementation';

const api = ApiExpress.build();

(async () => {
  try {
    await connectToDatabase();

    const userRepository = new UserRepositoryImplementation();
    const hashProvider = new BcryptHashProvider();
    const userService = new UserServiceImplementation(
      userRepository,
      hashProvider
    );
    const userController = new UserController(userService);
    const userRoutes = new UserRoutesImplementation(userController);

    const googleSheetsAuthProvider = new SheetAuthProvider();
    const googleSheetsRepository = new SheetRepositoryImplementation(
      googleSheetsAuthProvider
    );
    const googleSheetsService = new SheetsServiceImplementation(
      googleSheetsRepository
    );
    const googleSheetsController = new GoogleSheetsController(
      googleSheetsService
    );
    const googleSheetsRoutes = new SheetsRoutesImplementation(
      googleSheetsController
    );

    api.addGetRoute(
      '/api/googlesheets/metadata',
      googleSheetsRoutes.getMetadata
    );
    api.addGetRoute('/api/googlesheets/rows', googleSheetsRoutes.getRows);
    api.addGetRoute(
      '/api/googlesheets/patology',
      googleSheetsRoutes.getPatology
    );
    api.addGetRoute(
      '/api/googlesheets/row/:lineId',
      googleSheetsRoutes.findByRowIndex
    );
    api.addGetRoute(
      '/api/googlesheets/treatments',
      googleSheetsRoutes.getTreatments
    );

    api.addPostRoute('/api/googlesheets/addrow', googleSheetsRoutes.createRow);
    api.addPostRoute(
      '/api/googlesheets/updatevalue',
      googleSheetsRoutes.updateValue
    );
    api.addPostRoute(
      '/api/googlesheets/dashboard/delete',
      googleSheetsRoutes.deleteRow
    );

    api.addPostRoute('/api/users/register', userRoutes.register);
    api.addPostRoute('/api/users/login', userRoutes.login);
    api.addGetRoute('/api/users/me', userRoutes.me);

    api.start(3000);
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
})();
