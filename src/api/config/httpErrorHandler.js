export default class HttpErrorHandler {
  handle(res, error = {}) {
    const status = error?.status || error?.statusCode || error?.response?.status || 400;
    console.log(status);
    switch (status) {
      case 401:
        return this.unauthorized(res, error);
      case 403:
        return this.forbidden(res, error);
      case 404:
      case 400:
        return this.notFound(res, error);
      case 409:
        return this.sessionLimitExceeded(res, error); 
      case 422:
        return this.unprocessableEntity(res, error);
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        return this.serverError(res, error);
      case 200:
        return this.success(res, error);
      default:
        return this.other(res, error);
    }
  }

  forbidden() { throw new Error('forbidden not implemented'); }
  unauthorized() { throw new Error('unauthorized not implemented'); }
  serverError() { throw new Error('serverError not implemented'); }
  success() { throw new Error('success not implemented'); }
  other() { throw new Error('other not implemented'); }
  notFound() { throw new Error('notFound not implemented'); }
  unprocessableEntity() { throw new Error('unprocessableEntity not implemented'); }
  sessionLimitExceeded() { throw new Error('sessionLimitExceeded not implemented'); }
}
