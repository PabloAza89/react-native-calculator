import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { SetStateAction, Dispatch } from 'react';

export interface OwnButtonI {
  scrollEnd?: any,
  parErr?: any,
  value?: any,
  input?: any,
  setInput?: any,
  arr1?: any,
  arr5?: any,
  smaller?: boolean,
  setParErr?: any,
  setSecInput?: any,
  vmin?: any
};

export interface counterI {
  [index: string]: number
}

export interface AdderI {
  scrollEnd?: any,
  input?: any,
  setInput?: any,
  setSecInput?: any,
  setParErr?: any
}

export interface dimI {
  screenHeight: number,
  screenWidth: number,
  windowHeight: number,
  windowWidth: number
}

interface navigationI {
  navigation: NavigationProp<ParamListBase>
}

export interface AboutI extends navigationI {
  vmin: number
}

export interface HomeI extends navigationI {
  vmin: number,
  port: boolean,
  input: string,
  secInput: string,
  setInput: Dispatch<SetStateAction<string>>,
  setSecInput: Dispatch<SetStateAction<string>>
}

export interface KnowMoreI extends navigationI {
  opw: number,
  port: boolean
}

export interface goUpI {
  "0": boolean,
  "1": boolean,
  "2": boolean
}