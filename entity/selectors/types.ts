import {Dictionary, EntityState} from '@ngrx/entity';
import {MemoizedSelector, MemoizedSelectorWithProps} from '@ngrx/store';
import {OperatorFunction} from 'rxjs';
import {IAppState} from "@app/app-store.module";
import {EntityStoreTypes} from "@libcomm/store/entity/types";


export namespace EntityStoreSelectors {

  import IState = EntityStoreTypes.IState;
  import IStateProps = EntityStoreTypes.IStateProps;
  import IStatusProps = EntityStoreTypes.IStatusProps;
  import IFieldProps = EntityStoreTypes.IFieldProps;

  export interface ISelectFeatureState<StateType> extends MemoizedSelector<IAppState, EntityState<StateType>> {
  }


  export interface IStateListSelector<StateType> extends MemoizedSelector<IAppState, Dictionary<StateType>> {
  }

  export interface ISelectorWithProps<T, P> extends MemoizedSelectorWithProps<IAppState, P, T> {
  }


  export interface IStateStatusSelector<StateType> extends MemoizedSelectorWithProps<IAppState, IStateProps, StateType> {
  }

  export interface ICollectionSelectors<StateType> {
    feature?: ISelectFeatureState<StateType>,
    entities?: IStateListSelector<StateType>,
  }

  export type TGetterState<S> = (collection: Dictionary<S>, props: IStateProps) => S;

  export type TGetterValue<S, V> = (state: S) => V ;
  export type TGetterValueWithProps<S, P, V> = (state: S, props: P) => V;

  export interface IGetters<State extends IState> {
    state: TGetterState<State>;
    status: TGetterValueWithProps<State, IStatusProps, boolean>;
    field: TGetterValueWithProps<State, IFieldProps, any>;
  }

  export interface IEntitySelects<StateType extends IState, Statuses> extends ICollectionSelectors<StateType> {
    field?: ISelectorWithProps<any, IFieldProps>,
    status?: ISelectorWithProps<boolean, IStatusProps>,
    state?: ISelectorWithProps<StateType, IStateProps>,
  }


  export interface IEntitySelectors<StateType extends IState, Statuses> extends ICollectionSelectors<StateType> {
    state?: (props: IStateProps) => OperatorFunction<IAppState, StateType>,
    field?: (props: IFieldProps) => OperatorFunction<IAppState, StateType>,
    status?: (props: IStatusProps) => OperatorFunction<IAppState, boolean>,
  }


}
