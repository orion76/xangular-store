import { Dictionary, EntityState } from '@ngrx/entity';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { xselect } from '../../rxjs-operators/select';
import { IStateEntity, IStateProps, IStatusProps } from '../types';





export namespace EntitySelectorsMany {

  export function create<AppState, StateEntity extends IStateEntity>(feature: MemoizedSelector<AppState, EntityState<StateEntity>>) {

    const selectors = getSelectors<AppState, StateEntity>(feature);

    return {
      entities: xselect(selectors.entities),
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



function getSelectors<AppState, StateEntity extends IStateEntity>(feature: MemoizedSelector<AppState, EntityState<StateEntity>>) {

  type State = EntityState<StateEntity>;

  const entities = createSelector(feature, (state: State) => state.entities);
  const entity = createSelector(entities, (collection: Dictionary<StateEntity>, { stateId }: IStateProps) => collection[stateId]);
  const data = createSelector(entity, ((entity: StateEntity) => entity.data));
  const status = createSelector(entity, ((entity: StateEntity) => entity.status));
  const counts = createSelector(entity, ((entity: StateEntity) => entity.counts));

  // const isStatus = createSelector(entity, ((entity: StateEntity, props: IStatusProps) => entity.status[props.status] === props.value ? entity.data : null));
  // const notStatus = createSelector(entity, ((entity: StateEntity, props: IStatusProps) => entity.status[props.status] !== props.value ? entity.data : null));


  // const isStatus = createSelector(entity, ((entity: StateEntity, props: IStatusProps) => {
  //   return Object.keys(props.status).every((status: string) => entity.status[status] === props[status])
  // }));
  // const notStatus = createSelector(entity, ((entity: StateEntity, props: IStatusProps) => {
  //   return Object.keys(props.status).every((status: string) => entity.status[status] !== props[status])
  // }));


  const isStatus = createSelector(entity, ((entity: StateEntity, props: IStatusProps) => {
    return Object.keys(props.status).every((status: string) => entity.status[status] === props[status]) ? entity : null;
  }));
  const notStatus = createSelector(entity, ((entity: StateEntity, props: IStatusProps) => {
    return Object.keys(props.status).every((status: string) => entity.status[status] !== props[status]) ? entity : null;
  }));

  return { entities, entity, data, status, counts, isStatus, notStatus };
}

