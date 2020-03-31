import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

constructor() { }
  handleError(error: any): void {

    console.log('An error was handled.');

    // throw error;
  }

}
