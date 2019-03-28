import { createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { onStatus } from '@xangular-store/entity/selectors/operators';
import { IStateEntity, IStatusProps } from '@xangular-store/entity/types';
import { xselect } from '@xangular-store/rxjs-operators/select';
import { OperatorFunction } from 'rxjs';


export namespace EntitySelectors {

  export function create<AppState>(feature: MemoizedSelector<AppState, IStateEntity>) {


    const _sectionSelector = sectionSelector<AppState>(feature);

    return {
      entityState: xselect(feature),
      entity: xselect(_sectionSelector('entity')),
      request: xselect(_sectionSelector('request')),
      status: xselect(_sectionSelector('status')),
      onStatus: (props: IStatusProps) => onStatus(_sectionSelector('status'), feature, props),
    }
  }
}


type sectionName = keyof IStateEntity;

type sectionType = IStateEntity[sectionName];

export function sectionSelector<AppState>(
  entitySelector: MemoizedSelector<AppState, IStateEntity>
): (section: sectionName) => MemoizedSelector<AppState, sectionType> {
  return (section: sectionName) => {
    return createSelector(entitySelector, (state: IStateEntity) => state[section]);
  }
}


export function getSelector<AppState, Props, Result>(selector: MemoizedSelectorWithProps<AppState, Props, Result>) {
  return (props: Props): OperatorFunction<AppState, Result> => xselect(selector, props);
}
