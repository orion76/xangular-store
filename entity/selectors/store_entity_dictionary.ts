import { Dictionary, EntityState } from '@ngrx/entity';
import { createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { onStatus } from './operators';
import { IStateEntity, IStateProps } from '../types';
import { xselect } from '../../rxjs-operators/select';
import { OperatorFunction } from 'rxjs';


export namespace EntitySelectors {

  export function create<AppState>(feature: MemoizedSelector<AppState, EntityState<IStateEntity>>) {

    const _entitiesSelector = entitiesSelector<AppState>(feature);
    const _entitySelector = entitySelector<AppState>(_entitiesSelector);
    const _sectionSelector = sectionSelector<AppState>(_entitySelector);

    return {
      entities: xselect(_entitiesSelector),
      entityState: (props: IStateProps) => xselect(_entitiesSelector, props),
      entity: (props: IStateProps) => xselect(_sectionSelector('entity'), props),
      request: (props: IStateProps) => xselect(_sectionSelector('request'), props),
      status: (props: IStateProps) => xselect(_sectionSelector('status'), props),
      onStatus: (props: IStateProps) => onStatus(_sectionSelector('status'), _entitySelector, props),
    }
  }
}


export function entitiesSelector<AppState>(
  feature: MemoizedSelector<AppState, EntityState<IStateEntity>>
): MemoizedSelector<AppState, Dictionary<IStateEntity>> {

  return createSelector(feature, (state: EntityState<IStateEntity>) => state.entities);
}

export function entitySelector<AppState>(
  entitiesSelector: MemoizedSelector<AppState, Dictionary<IStateEntity>>
): MemoizedSelectorWithProps<AppState, IStateProps, IStateEntity> {
  return createSelector(entitiesSelector, (collection: Dictionary<IStateEntity>, { stateId }: IStateProps) => collection[stateId]);
}

type sectionName = keyof IStateEntity;

type sectionType = IStateEntity[sectionName];

export function sectionSelector<AppState>(
  entitySelector: MemoizedSelectorWithProps<AppState, IStateProps, IStateEntity>
): (section: sectionName) => MemoizedSelectorWithProps<AppState, IStateProps, sectionType> {
  return (section: sectionName) => {
    return createSelector(entitySelector, (state: IStateEntity) => state[section]);
  }
}


// export function entity<AppState, Entity>(selector: MemoizedSelectorWithProps<AppState, IStateProps, Entity>) {
// return (props: IStateProps): OperatorFunction<AppState, Entity> => xselect(selector, props);
// }

export function getSelector<AppState, Props, Result>(selector: MemoizedSelectorWithProps<AppState, Props, Result>) {
  return (props: Props): OperatorFunction<AppState, Result> => xselect(selector, props);
}
