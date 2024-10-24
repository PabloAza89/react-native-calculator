import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { SetStateAction, Dispatch } from 'react';

export interface counterI {
  [index: string]: number
}

export interface dimI {
  screenHeight: number,
  screenWidth: number,
  windowHeight: number,
  windowWidth: number
}

export interface navigationI {
  navigation: NavigationProp<ParamListBase>
}

export interface HomeI extends navigationI {
  vmin: number,
  port: boolean,
  input: string,
  secInput: string,
  setInput: Dispatch<SetStateAction<string>>,
  setSecInput: Dispatch<SetStateAction<string>>
}

export interface AboutI extends navigationI {
  vmin: number
}

export interface KnowMoreI extends navigationI {
  opw: number,
  port: boolean
}

export interface AdderI {
  input: string,
  scrollEnd(): void,
  setParErr: Dispatch<SetStateAction<boolean>>,
  setInput: Dispatch<SetStateAction<string>>,
  setSecInput: Dispatch<SetStateAction<string>>
}

export interface OwnButtonI extends AdderI {
  vmin: number,
  parErr: boolean | undefined,
  smaller: boolean | undefined,
  value: string
};

export interface goUpI {
  "0": boolean,
  "1": boolean,
  "2": boolean
}

export interface operationI {
  [key: string] : (a: string, b: string) => number,
}