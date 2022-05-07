import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string) => {
  if (process.env.NODE_ENV === 'development') {
    return Cookies.set(name, value);
  }

  return Cookies.set(name, value, { domain: process.env.REACT_APP_DOMAIN });
};
