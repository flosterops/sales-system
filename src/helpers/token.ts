import { isString } from 'models/guards';

export const getBearerAuthorizationToken = (token: string): string => {
  if (isString(token)) {
    return `Bearer ${token}`;
  }
  throw new Error('Token is not a string');
};

export const BASIC_AUTHORIZATION_TOKEN = 'Basic Y2FyemFtT2F1dGgySWQ6Y2FyemFtT2F1dGgyc2VjcmV0';
