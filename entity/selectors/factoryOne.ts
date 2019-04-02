import { Dictionary, EntityState } from '@ngrx/entity';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { xselect } from '../../rxjs-operators/select';
import { IStateEntity, IStateProps, IStatusProps } from '../types';





export namespace EntitySelectors {

  export function create<AppState, StateEntity extends IStateEntity>(feature: MemoizedSelector<AppState, StateEntity>) {

    const selectors = getSelectors<AppState, StateEntity>(feature);

    return {
      entityState: (props: IStateProps) => xselect(selectors.entity, props),
      entity: (props: IStateProps) => xselect(selectors.entity, props),
      data: (props: IStateProps) => xselect(selectors.data, props),
      status: (props: IStateProps) => xselect(selectors.status, props),
      counts: (props: IStateProps) => xselect(selectors.counts, props),
      isStatus: (props: IStatusProps) => xselect(selectors.isStatus, props),
      notStatus: (props: IStatusProps) => xselect(selectors.notStatus, props),
    }
  }
}



export function getSelectors<AppState, StateEntity extends IStateEntity>(entity: MemoizedSelector<AppState, StateEntity>) {
  const data = createSelector(entity, ((entity: StateEntity) => entity.data));
  const status = createSelector(entity, ((entity: StateEntity) => entity.status));
  const counts = createSelector(entity, ((entity: StateEntity) => entity.counts));

  const isStatus = createSelector(entity, ((entity: StateEntity, props: IStatusProps) => entity.status[props.status] === props.value ? entity.data : null));
  const notStatus = createSelector(entity, ((entity: StateEntity, props: IStatusProps) => entity.status[props.status] !== props.value ? entity.data : null));

  return { entity, data, status, counts, isStatus, notStatus };
}

