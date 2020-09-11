import React, { PropsWithChildren } from "react";
import * as R from "fp-ts/lib/Reader";

export type FC<A> = R.Reader<PropsWithChildren<A>, JSX.Element>;

const concat = (fc2: FC<any>) => (fc1: FC<any>): FC<any> => (props) => (
  <>
    {fc1(props)}
    {fc2(props)}
  </>
);

const map = R.map.bind(R);

const contramap = R.local.bind(R);

export { concat, map, contramap };
