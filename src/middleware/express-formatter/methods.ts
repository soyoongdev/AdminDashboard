export type MethodType =
  | 'Ok'
  | 'Created'
  | 'Accepted'
  | 'No-Content'
  | 'Bad-Request'
  | 'Unauthorized'
  | 'Forbidden'
  | 'Not-Found'
  | 'Method-Not-Allowed'
  | 'Timeout'
  | 'Conflict'
  | 'Unprocessed'
  | 'Too-Many-Requests'
  | 'Server-Error'
  | 'Bad-Gateway'
  | 'Service-Unavailable'
  | 'Gateway-Timeout'

export type MethodStatus =
  | 200
  | 201
  | 202
  | 204
  | 400
  | 401
  | 403
  | 404
  | 405
  | 408
  | 409
  | 422
  | 429
  | 500
  | 502
  | 503
  | 504

export interface Method {
  status: MethodStatus
  type: MethodType
}

const methods: Method[] = [
  {
    status: 200,
    type: 'Ok'
  },
  {
    type: 'Created',
    status: 201
  },
  {
    type: 'Accepted',
    status: 202
  },
  {
    type: 'No-Content',
    status: 204
  },
  {
    type: 'Bad-Request',
    status: 400
  },
  {
    type: 'Unauthorized',
    status: 401
  },
  {
    type: 'Forbidden',
    status: 403
  },
  {
    type: 'Not-Found',
    status: 404
  },
  {
    type: 'Method-Not-Allowed',
    status: 405
  },
  {
    type: 'Timeout',
    status: 408
  },
  {
    type: 'Conflict',
    status: 409
  },
  {
    type: 'Unprocessed',
    status: 422
  },
  {
    type: 'Too-Many-Requests',
    status: 429
  },
  {
    type: 'Server-Error',
    status: 500
  },
  {
    type: 'Bad-Gateway',
    status: 502
  },
  {
    type: 'Service-Unavailable',
    status: 503
  },
  {
    type: 'Gateway-Timeout',
    status: 504
  }
]

export default methods
