import { any, bool, func} from 'prop-types';

// eslint-disable-next-line fp/no-mutation
const ViewContainerProps = {
  setToken: func,
  isLoggedIn: bool,
  token: any,
};

export { ViewContainerProps };
