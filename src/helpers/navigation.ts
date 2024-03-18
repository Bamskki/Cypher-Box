import * as NavigationService from '../../NavigationService';
import { CommonActions } from '@react-navigation/native';

export default function dispatchNavigate(routeName: string, params?: any) {
  NavigationService.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params
    }),
  );
};