import { Request, Response } from 'express';
import GoogleSheetsController from '../../controllers/GoogleSheetController';
import IGoogleSheetsRoutes from '../GoogleSheetRoutes';

export class SheetsRoutesImplementation implements IGoogleSheetsRoutes {
  constructor(private googleSheetsController: GoogleSheetsController) {}
  getMetadata = async (request: Request, response: Response): Promise<void> => {
    await this.googleSheetsController.createRow(request, response);
  };
  getRows = async (request: Request, response: Response): Promise<void> => {
    await this.googleSheetsController.getRows(response, request);
  };
  getPatology = async (request: Request, response: Response): Promise<void> => {
    await this.googleSheetsController.getPatologies(request, response);
  };
  getTreatments = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    await this.googleSheetsController.getTreatments(request, response);
  };
  createRow = async (request: Request, response: Response): Promise<void> => {
    await this.googleSheetsController.createRow(request, response);
  };
  updateValue = async (request: Request, response: Response): Promise<void> => {
    await this.googleSheetsController.updatedValue(request, response);
  };
  findByRowIndex = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    await this.googleSheetsController.findRow(request, response);
  };
  deleteRow = async (request: Request, response: Response): Promise<void> => {
    await this.googleSheetsController.deleteRow(request, response);
  };
}
