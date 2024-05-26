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

export function dispatchReset(routeName: string, params?: any) {
  NavigationService.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    })
  );
};

export const resetAndNavigate = (parentRouteName: string, nextRouteName: string, params?: any) => {
  NavigationService.dispatch(CommonActions.reset({
    index: 1,
    routes: [
      { name: parentRouteName },
      { name: nextRouteName, params },
    ],
  }));
};
