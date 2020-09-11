import React, { PropsWithChildren } from "react";
import { pipe } from "fp-ts/function";
import * as FC from "./FC";

type FC<A> = FC.FC<A>;

const header: FC<void> = () => <h1>Awesome App</h1>;
const greeting: FC<{ name: string }> = ({ name }) => <p>Hello {name}!</p>;
const footer1: FC<void> = () => <p>© Bob McBob 2017</p>;

const main = pipe(
  header,
  FC.map((element) => <header style={{ color: "red" }}>{element}</header>),
  FC.concat(FC.contramap(() => ({ name: "Alice" }))(greeting)),
  FC.concat(
    pipe(
      footer1,
      FC.map((element) => <footer style={{ color: "blue" }}>{element}</footer>)
    )
  )
);

const App = () => main(undefined as PropsWithChildren<void>);

export default App;
