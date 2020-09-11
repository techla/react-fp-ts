import React, { PropsWithChildren } from "react";
import { Contravariant1 } from "fp-ts/lib/Contravariant";
import { flow } from "fp-ts/lib/function";
import { uncurryN } from "ramda";
import { Monoid } from "fp-ts/lib/Monoid";
import { Semigroup } from "fp-ts/lib/Semigroup";

export interface FC<A> {
  (a: React.PropsWithChildren<A>): JSX.Element;
}
const URI = "FC";

type URI = typeof URI;

declare module "fp-ts/lib/HKT" {
  interface URItoKind<A> {
    readonly [URI]: FC<A>;
  }
}

export const concat: <A, B>(fa: FC<A>) => (fb: FC<B>) => FC<A & B> = (fa) => (
  fb
) => (props) => (
  <>
    {fa(props)}
    {fb(props)}
  </>
);

export const empty = () => <></>;

export const contramap: <A, B>(f: (b: B) => A) => (fa: FC<A>) => FC<B> = (
  f
) => (fa) => flow(f, fa);

export const map: <A>(
  f: (a: JSX.Element) => JSX.Element
) => (fa: FC<A>) => FC<A> = (f) => (fa) => flow(fa, f);

export function getSemigroup<A>(): Semigroup<FC<A>> {
  return {
    concat: uncurryN(2, concat),
  };
}

export function getMonoid<A>(): Monoid<FC<A>> {
  return {
    concat: getSemigroup<A>().concat,
    empty,
  };
}

export const getContravariant: Contravariant1<URI> = {
  URI,
  contramap: uncurryN(2, contramap),
};
