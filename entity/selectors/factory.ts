import {Dictionary, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';

import {IAppState} from "@app/app-store.module";
import {EntityStoreTypes} from "../types";
import {EntitySelectors, EntityStoreSelectors} from "@libcomm/store/entity";
import ICollectionSelectors = EntityStoreSelectors.ICollectionSelectors;
import ISelectFeatureState = EntityStoreSelectors.ISelectFeatureState;
import IEntitySelectors = EntityStoreSelectors.IEntitySelectors;
import IState = EntityStoreTypes.IState;
import TStatusName = EntityStoreTypes.TStatusName;
import IEntitySelects = EntityStoreSelectors.IEntitySelects;

import IStateProps = EntityStoreTypes.IStateProps;
import IStatusProps = EntityStoreTypes.IStatusProps;
import selectNotEmpty = EntitySelectors.selectNotEmpty;
import ISelectorWithProps = EntityStoreSelectors.ISelectorWithProps;
import IFieldProps = EntityStoreTypes.IFieldProps;
import IGetters = EntityStoreSelectors.IGetters;


export function collectionsSelectors<StateType>(
  featureName: keyof IAppState,
  featureAdapter: EntityAdapter<StateType>): ICollectionSelectors<StateType> {

  const {selectEntities} = featureAdapter.getSelectors();

  const feature: ISelectFeatureState<StateType> = createFeatureSelector<IAppState, EntityState<StateType>>(featureName);
  const entities = createSelector(feature, selectEntities);

  return {feature, entities};
}

export function createGetters<State extends IState, Statuses>(): IGetters<State> {

  const state = (collection: Dictionary<State>, props: IStateProps) => collection[props.stateId];


  const request = (state: State) => state.request;
  const field = (state: State, props: IFieldProps) => state.entity;

  const status = (state: State, props: IStatusProps) => {
    return state.status[props.status] && state.status[props.status] === props.value;
  };


  return {state, status, field};

}

export function entitySelects<StateType extends IState, Statuses extends string>(
  featureName: keyof IAppState,
  featureAdapter: EntityAdapter<StateType>,
  getters: Partial<IGetters<StateType>>
): IEntitySelects<StateType, TStatusName> {


  const {entities} = collectionsSelectors(featureName, featureAdapter);

  const stateSelector: ISelectorWithProps<StateType, IStateProps> = createSelector(entities, getters.state);
  const status: ISelectorWithProps<boolean, IStatusProps> = createSelector(stateSelector, getters.status);



  return {entities, status};
}


export function entitySelectors<StateType extends IState, Statuses extends TStatusName>(
  featureName: keyof IAppState,
  featureAdapter: EntityAdapter<StateType>): IEntitySelectors<StateType, TStatusName> {

  const selects = entitySelects<StateType, Statuses>(featureName, featureAdapter, createGetters<StateType, Statuses>());


  return {
    entities: selects.entities,


    status: (props: IStateProps) => selectNotEmpty<StateType['status'], IStateProps>(selects.status),

  };
}

export function createSelectors<StateType extends IState, Statuses extends TStatusName>(
  featureName: keyof IAppState,
  featureAdapter: EntityAdapter<StateType>): IEntitySelectors<StateType, TStatusName> {

  const selects = entitySelects<StateType, Statuses>(featureName, featureAdapter, createGetters<StateType, Statuses>());

  return {
    state: (props: IStateProps) => selectNotEmpty<StateType, IStateProps>(selects.state),
    status: (props: IStateProps) => selectNotEmpty<StateType['status'], IStateProps>(selects.status),
    field: (props: IFieldProps) => selectNotEmpty<StateType, IStateProps>(selects.field),
  };
}
