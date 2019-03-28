import { IStateProps } from '../types';
import { IAppState } from '@app-store/app-store.module';
import { Observable, OperatorFunction } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';
import { ISelectorWithProps } from './types';




export namespace EntitySelectors {



  export function selectNotEmpty<T, Props, K>(
    pathOrMapFn: ((state: T, props?: Props) => any) | string,
    propsOrPath: Props | string,
    ...paths: string[]
  ) {
    return function selectOperator(source$: Observable<T>): Observable<K> {
      let mapped$: Observable<any>;

      if (typeof pathOrMapFn === 'string') {
        const pathSlices = [<string>propsOrPath, ...paths].filter(Boolean);
        mapped$ = source$.pipe(pluck(pathOrMapFn, ...pathSlices));
      } else if (typeof pathOrMapFn === 'function') {
        mapped$ = source$.pipe(
          map(source => pathOrMapFn(source, <Props>propsOrPath)),
          distinctUntilChanged(),
          filter(Boolean)
        );
      } else {
        throw new TypeError(
          `Unexpected type '${typeof pathOrMapFn}' in select operator,` +
          ` expected 'string' or 'function'`
        );
      }

      return mapped$.pipe(distinctUntilChanged());
    };
  }
  // export function selectState<StateType>(selector: IStateSelector<StateType>) {
  //   return (props: IStateProps) => {
  //     return (source$: Observable<IAppState>) => selectNotEmpty(selector, props);
  //   };
  // }
  //
  // export function selectStateStatus<StateType, Statuses>(selector: IStateStatusSelector<StateType>) {
  //   return (props: IStatusProps<Statuses>) => selectNotEmpty<StateType, IStatusProps<Statuses>>(selector, props);
  //
  //
  // }
  //
  // export function selectRequest<RequestType>(selector: IRequestSelector<RequestType>) {
  //   return (props: IStateProps) => selectNotEmpty<RequestType, IStateProps>(selector, props);
  // }
  //
  // export function selectEntity<EntityType>(selector: IEntitySelector<EntityType>) {
  //   return (props: IStateProps) => selectNotEmpty<EntityType, IStateProps>(selector, props);
  //
  // }
  //
  // export function selectStatus<Status>(selector: IStatusSelector<Status>) {
  //   return (props: IStateProps) => selectNotEmpty<Status, IStateProps>(selector, props);
  // }


}
