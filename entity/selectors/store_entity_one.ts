import { createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';

import { IEntityStates, IStatusProps } from '../types';
import { xselect } from '../../rxjs-operators/select';
import { OperatorFunction } from 'rxjs';


export namespace EntitySelectors {

  // export function create<AppState>(feature: MemoizedSelector<AppState, IEntityStates>) {


  //   const _sectionSelector = sectionSelector<AppState>(feature);

  //   return {
  //     entityState: xselect(feature),
  //     entity: xselect(_sectionSelector('entity')),
  //     request: xselect(_sectionSelector('request')),
  //     status: xselect(_sectionSelector('status')),
  //     onStatus: (props: IStatusProps) => onStatus(_sectionSelector('status'), feature, props),
  //   }
  // }
}


type sectionName = keyof IEntityStates;

type sectionType = IEntityStates[sectionName];

export function sectionSelector<AppState>(
  entitySelector: MemoizedSelector<AppState, IEntityStates>
): (section: sectionName) => MemoizedSelector<AppState, sectionType> {
  return (section: sectionName) => {
    return createSelector(entitySelector, (state: IEntityStates) => state[section]);
  }
}


export function getSelector<AppState, Props, Result>(selector: MemoizedSelectorWithProps<AppState, Props, Result>) {
  return (props: Props): OperatorFunction<AppState, Result> => xselect(selector, props);
}
