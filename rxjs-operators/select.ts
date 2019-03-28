import { Observable } from 'rxjs';
import { distinctUntilChanged, map, pluck, filter } from 'rxjs/operators';

export function xselect<T, Props, K>(
  mapFn: (state: T, props: Props) => K,
  props?: Props
): (source$: Observable<T>) => Observable<K>;
export function xselect<T, a extends keyof T>(
  key: a,
  props: null
): (source$: Observable<T>) => Observable<T[a]>;
export function xselect<T, a extends keyof T, b extends keyof T[a]>(
  key1: a,
  key2: b
): (source$: Observable<T>) => Observable<T[a][b]>;
export function xselect<
  T,
  a extends keyof T,
  b extends keyof T[a],
  c extends keyof T[a][b]
  >(
    key1: a,
    key2: b,
    key3: c
  ): (source$: Observable<T>) => Observable<T[a][b][c]>;
export function xselect<
  T,
  a extends keyof T,
  b extends keyof T[a],
  c extends keyof T[a][b],
  d extends keyof T[a][b][c]
  >(
    key1: a,
    key2: b,
    key3: c,
    key4: d
  ): (source$: Observable<T>) => Observable<T[a][b][c][d]>;
export function xselect<
  T,
  a extends keyof T,
  b extends keyof T[a],
  c extends keyof T[a][b],
  d extends keyof T[a][b][c],
  e extends keyof T[a][b][c][d]
  >(
    key1: a,
    key2: b,
    key3: c,
    key4: d,
    key5: e
  ): (source$: Observable<T>) => Observable<T[a][b][c][d][e]>;
export function xselect<
  T,
  a extends keyof T,
  b extends keyof T[a],
  c extends keyof T[a][b],
  d extends keyof T[a][b][c],
  e extends keyof T[a][b][c][d],
  f extends keyof T[a][b][c][d][e]
  >(
    key1: a,
    key2: b,
    key3: c,
    key4: d,
    key5: e,
    key6: f
  ): (source$: Observable<T>) => Observable<T[a][b][c][d][e][f]>;
/**
 * This overload is used to support spread operator with
 * fixed length tuples type in typescript 2.7
 */
export function xselect<T, Props = any, K = any>(
  propsOrPath: Props,
  ...paths: string[]
): (source$: Observable<T>) => Observable<K>;
export function xselect<T, Props, K>(
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
        map(source => pathOrMapFn(source, <Props>propsOrPath))
      );
    } else {
      throw new TypeError(
        `Unexpected type '${typeof pathOrMapFn}' in select operator,` +
        ` expected 'string' or 'function'`
      );
    }

    return mapped$.pipe(
      distinctUntilChanged(), filter(Boolean)
    );
  };
}
