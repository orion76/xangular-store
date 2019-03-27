import {Observable, OperatorFunction} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {IAppState} from "@app/app-store.module";
import {EntityStoreTypes} from "@libcomm/store/entity/types";
import {EntityStoreSelectors} from "@libcomm/store/entity";


export namespace EntitySelectors {

  import IStateProps = EntityStoreTypes.IStateProps;

  import ISelectorWithProps = EntityStoreSelectors.ISelectorWithProps;

  export function selectNotEmpty<T, P extends IStateProps>(selector: ISelectorWithProps<any, P>, props?: P): OperatorFunction<IAppState, T> {

    return (source$: Observable<IAppState>) => {
      let mapped$: Observable<T>;
      mapped$ = source$.pipe(
        map(source => selector(source, <P>props)),
        distinctUntilChanged(),
        filter(Boolean)
      );
      return mapped$;
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
