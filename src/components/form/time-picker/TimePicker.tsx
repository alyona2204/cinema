import Input, { type InputPropsType } from "../input/Input";

function TimePicker(props: InputPropsType<string>) {
  return <Input type="time" {...props} />;
}

export default TimePicker;
