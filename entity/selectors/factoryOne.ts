import { createSelector, MemoizedSelector } from '@ngrx/store';
import { xselect } from '../../rxjs-operators/select';
import { IStateProps, IStateRecord, IStatusProps, TEntityStatus, TStatus } from '../types';





export namespace EntitySelectorsOne {

  export function create<AppState, StateRecord extends IStateRecord, StatusList extends string>(feature: MemoizedSelector<AppState, StateRecord>) {

    const selectors = getSelectors<AppState, StateRecord>(feature);

    return {
      entityState: (props: IStateProps) => xselect(selectors.entity, props),
      entity: xselect(selectors.entity),
      data: xselect(selectors.data),
      status: xselect(selectors.status),
      counts: xselect(selectors.counts),
      isStatus: (status: TStatus<StatusList>) => xselect(selectors.isStatus, { status }),
      notStatus: (status: TEntityStatus) => xselect(selectors.notStatus, { status }),
    }
  }
}



function getSelectors<AppState, StateRecord extends IStateRecord>(entity: MemoizedSelector<AppState, StateRecord>) {
  const data = createSelector(entity, ((entity: StateRecord) => entity.data));
  const status = createSelector(entity, ((entity: StateRecord) => entity.status));
  const counts = createSelector(entity, ((entity: StateRecord) => entity.counts));

  const isStatus = createSelector(((entity: StateRecord, props: IStatusProps) => {

    console.log('[isStatus]', { entity, needStatus: props.status });

    const result = Object.keys(props.status)
    // .filter((name: string)=>)
      .every((name: string) => {
        return entity.status[name] === props.status[name];
      }) ? entity : null;

    return result;
  }));

  const notStatus = createSelector(((entity: StateRecord, props: IStatusProps) => {

    return Object.keys(props.status).every((name: string) => {

      return entity.status[name] !== props.status[name];
    }) ? entity : null;
  }));

  return { entity, data, status, counts, isStatus, notStatus };
}

