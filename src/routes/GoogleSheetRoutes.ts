import { Request, Response } from 'express';

export default interface IGoogleSheetsRoutes {
  getMetadata(request: Request, response: Response): Promise<void>;
  getRows(request: Request, response: Response): Promise<void>;
  getPatology(request: Request, response: Response): Promise<void>;
  getTreatments(request: Request, response: Response): Promise<void>;
  createRow(request: Request, response: Response): Promise<void>;
  updateValue(request: Request, response: Response): Promise<void>;
  findByRowIndex(request: Request, response: Response): Promise<void>;
  deleteRow(request: Request, response: Response): Promise<void>;
}
