import { IButtonProps } from "native-base";

export type ButtonProps = {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
} & IButtonProps;