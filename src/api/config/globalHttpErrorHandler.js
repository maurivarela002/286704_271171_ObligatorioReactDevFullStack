const HttpErrorHandler = require('./httpErrorHandler');
import { getTranslatedError, handleApiError, handleApiSuccess } from './i18nErrorHandler';

class GlobalHttpErrorHandler extends HttpErrorHandler {
  buildMessage(error, fallbackKey, status) {
    const defaultKey = fallbackKey || 'other';
    const message = error?.message || getTranslatedError(`${defaultKey}.title`) || 'Error';
    const text = error?.text || getTranslatedError(`${defaultKey}.text`) || '';
    const extra = error?.extra || undefined;
    
    const payload = { 
      message,
      text,
      errorCode: status 
    };
    
    return extra ? { ...payload, extra } : payload;
  }

  forbidden(res, error) {
    const response = this.buildMessage(error, 'forbidden', 403);
    handleApiError({ response: { data: response } });
    return res.status(403).json(response);
  }

  unauthorized(res, error) {
    const response = this.buildMessage(error, 'unauthorized', 401);
    handleApiError({ response: { data: response } });
    return res.status(401).json(response);
  }

  serverError(res, error) {
    if (error?.stack) console.error('ServerError:', error.stack);
    const response = this.buildMessage(error, 'serverError', 500);
    handleApiError({ response: { data: response } });
    return res.status(500).json(response);
  }

  success(res, data) {
    const response = {
      ...this.buildMessage({}, 'success', 200),
      data
    };
    handleApiSuccess({ data: response });
    return res.status(200).json(response);
  }

  other(res, error) {
    const response = this.buildMessage(error, 'other', 400);
    handleApiError({ response: { data: response } });
    return res.status(400).json(response);
  }

  notFound(res, error) {
    const response = this.buildMessage(error, '404', 404);
    handleApiError({ response: { data: response } });
    return res.status(404).json(response);
  }

  unprocessableEntity(res, error) {
    const response = this.buildMessage(error, '422', 422);
    handleApiError({ response: { data: response } });
    return res.status(422).json(response);
  }

  sessionLimitExceeded(res, error) {
    const response = this.buildMessage(error, 'sessionLimitExceeded', 409);
    handleApiError({ response: { data: response } });
    return res.status(409).json(response);
  }

  sessionConflict(res, error) {
    const response = this.buildMessage(error, 'sessionConflict', 409);
    handleApiError({ response: { data: response } });
    return res.status(409).json(response);
  }
}

const errorHandler = new GlobalHttpErrorHandler();

export default errorHandler;
