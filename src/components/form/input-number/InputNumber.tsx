import Input, { type InputPropsType } from "../input/Input";

export type NumberInputPropsType = Omit<
  InputPropsType<number>,
  "type" | "onChange"
> & {
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
};

function InputNumber(props: NumberInputPropsType) {
  return (
    <Input
      type="number"
      {...props}
      onChange={(value) => {
        const numberValue = Number(value);
        if (isNaN(numberValue)) {
          return;
        }
        if (props.min !== undefined && numberValue < props.min) {
          return;
        }
        if (props.max !== undefined && numberValue > props.max) {
          return;
        }
        props.onChange?.(numberValue);
      }}
    />
  );
}

export default InputNumber;
