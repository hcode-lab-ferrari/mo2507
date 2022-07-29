import {
  Picker,
  PickerItemProps,
  PickerProps,
} from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { ViewStyle } from 'react-native';
import { InputLabel } from '../InputField/InputLabel';
import { InputWrap } from '../InputField/InputWrap';

type ComboBoxItemProps = {
  label: string;
  value: any;
};

type ComboBoxProps = {
  label: string;
  style?: ViewStyle;
  selectedValue?: any;
  items: ComboBoxItemProps[];
  itemProps?: PickerItemProps;
  inputProps?: PickerProps;
  onChange?: (itemValue: any, itemIndex: number) => void;
};

export const ComboBox = ({
  label,
  style,
  selectedValue,
  items,
  inputProps = {},
  itemProps = {},
  onChange = () => {},
}: ComboBoxProps) => {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(selectedValue);
  const [focused, setFocused] = useState(false);

  useEffect(() => setValue(selectedValue), [selectedValue]);
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(value, index);
    }
  }, [value]);

  return (
    <InputWrap focused={focused} style={{ ...style }}>
      <InputLabel focused={focused}>{label}</InputLabel>
      <Picker
        {...inputProps}
        style={{ marginLeft: -8, marginTop: -10, marginBottom: -10 }}
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => {
          setIndex(itemIndex);
          setValue(itemValue);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {items.map((item, index) => (
          <Picker.Item
            {...itemProps}
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </InputWrap>
  );
};
