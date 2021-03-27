import { any, bool, func} from 'prop-types';

const ViewContainerProps = {
  setToken: func,
  isLoggedIn: bool,
  token: any,
};

export { ViewContainerProps };
