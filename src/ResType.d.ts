import {Response} from "express";
export type ResType = Response & {
  $success,
  $error
}