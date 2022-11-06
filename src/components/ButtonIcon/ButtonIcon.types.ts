import { TouchableOpacityProps } from "react-native";
import { IconProps } from "phosphor-react-native";

export type ButtonIconProps = {
  icon: React.FC<IconProps>;
} & TouchableOpacityProps;