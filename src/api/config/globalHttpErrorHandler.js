import HttpErrorHandler from './httpErrorHandler';
import { useApiHandlers } from './i18nErrorHandler';

export class GlobalHttpErrorHandler extends HttpErrorHandler {
  constructor() {
    super();
    this.toast = null;
  }

  initHandlers() {
    const { handleApiError, handleApiSuccess } = useApiHandlers();
    this.apiHandlers = { handleApiError, handleApiSuccess };
  }

  handleError(error, status) {
    if (this.apiHandlers) {
      return this.apiHandlers.handleApiError(error);
    }
    console.error('Handlers no inicializados. Llama a initHandlers() primero.');
    return { message: error.message, status };
  }

  handleSuccess(response) {
    if (this.apiHandlers) {
      return this.apiHandlers.handleApiSuccess(response);
    }
    console.error('Handlers no inicializados. Llama a initHandlers() primero.');
    return response;
  }

  forbidden(res, error) {
    const response = this.handleError(error, 403);
    return res.status(403).json(response);
  }

  unauthorized(res, error) {
    const response = this.handleError(error, 401);
    return res.status(401).json(response);
  }

  serverError(res, error) {
    if (error?.stack) console.error('ServerError:', error.stack);
    const response = this.handleError(error, 500);
    return res.status(500).json(response);
  }

  success(res, data) {
    const response = {
      ...this.buildMessage({}, 'success', 200),
      data
    };
    return this.handleSuccess(response);
  }

  other(res, error) {
    const response = this.handleError(error, 400);
    return res.status(400).json(response);
  }

  notFound(res, error) {
    const response = this.handleError(error, 404);
    return res.status(404).json(response);
  }

  unprocessableEntity(res, error) {
    const response = this.handleError(error, 422);
    return res.status(422).json(response);
  }

  sessionLimitExceeded(res, error) {
    const response = this.handleError(error, 409);
    return res.status(409).json(response);
  }

  sessionConflict(res, error) {
    const response = this.handleError(error, 409);
    return res.status(409).json(response);
  }
}

const errorHandler = new GlobalHttpErrorHandler();

export default errorHandler;
