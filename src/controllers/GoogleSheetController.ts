import { Request, Response } from 'express';
import SheetsServiceImplementation from '../services/implementations/SheetsServiceImplementation';

export default class GoogleSheetsController {
  constructor(
    private sheetServiceImplementation: SheetsServiceImplementation,
  ) {}

  public getMetadata = async (request: Request, response: Response) => {
    try {
      const metadata = await this.sheetServiceImplementation.getMetadata();

      response.send(metadata);
    } catch (error) {
      response.status(500).send({ message: 'Internal server error' });
    }
  };

  public getRows = async (response: Response, request: Request) => {
    try {
      const { pageNumber } = request.query;
      const parsedPageNumber = Number(pageNumber) || 1;
      const pageSize = 500;
      const rows = await this.sheetServiceImplementation.getAllData(
        parsedPageNumber,
        pageSize,
      );

      response.send(rows);
    } catch (error) {
      response.status(500).send({ message: 'Internal server error' });
    }
  };

  public getPatologies = async (request: Request, response: Response) => {
    try {
      const patologies = await this.sheetServiceImplementation.getPatologies();

      response.send(patologies);
    } catch (error) {
      response.status(500).send({ message: 'Internal server error' });
    }
  };

  public getTreatments = async (request: Request, response: Response) => {
    try {
      const treatments = await this.sheetServiceImplementation.getTreatments();

      response.send(treatments);
    } catch (error) {
      response.status(500).send({ message: 'Internal server error.' });
    }
  };

  public createRow = async (request: Request, response: Response) => {
    try {
      const { values } = request.body;
      const newRow = await this.sheetServiceImplementation.createRow(values);

      response.send(newRow);
    } catch (error) {
      response.status(500).send({ message: 'Internal server error' });
    }
  };

  public updatedValue = async (request: Request, response: Response) => {
    try {
      const { lineId, values } = request.body;
      const updatedRow = await this.sheetServiceImplementation.updateRow(
        lineId,
        values,
      );

      response.send(updatedRow);
    } catch (error) {
      response.status(500).send({ message: 'Internal server error' });
    }
  };

  public findRow = async (request: Request, response: Response) => {
    try {
      const lineId = Number(request.params.lineId);
      const row = await this.sheetServiceImplementation.findRow(lineId);

      response.send(row);
    } catch (error) {
      response.status(500).send({ message: 'Internal server error' });
    }
  };

  public deleteRow = async (request: Request, response: Response) => {
    try {
      const { lineId } = request.body;
      const lineDeleted =
        await this.sheetServiceImplementation.deleteRow(lineId);

      response.send(lineDeleted);
    } catch (error) {
      response.status(500).send({ message: 'Internal server error' });
    }
  };
}
