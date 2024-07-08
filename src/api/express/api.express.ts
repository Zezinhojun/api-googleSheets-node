import { Api } from '../api';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';

export class ApiExpress implements Api {
  public static build() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(express.static('public'));
    return new ApiExpress(app);
  }

  private constructor(readonly app: Express) {}

  public addGetRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>,
  ) {
    this.app.get(path, handle);
  }
  public addPostRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>,
  ) {
    this.app.post(path, handle);
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log('Server running on port ' + port);
      this.printRoutes();
    });
  }

  private printRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((route: any) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method,
        };
      });
    console.log(routes);
  }
}
