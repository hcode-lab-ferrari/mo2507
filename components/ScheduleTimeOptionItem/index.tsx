import { useEffect, useState } from "react";
import { Dimensions, TextProps, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { vars } from "../../values";

type ScheduleTimeOptionItemProps = {
    value: string;
    onChecked?: (checked: boolean) => void;
} & ScheduleTimeOptionItemSelected;

type ScheduleTimeOptionItemSelected = {
    selected: boolean;
}

const ScheduleTimeOptionItemWrapper = styled.TouchableOpacity<TouchableOpacityProps & ScheduleTimeOptionItemSelected>`
    width: ${Math.ceil((Dimensions.get('window').width - vars.space * 3) / 2)}px;
    background-color: ${props => (props.selected) ? vars.blue : vars.gray10};
    height: 50px;
    justify-content: center;
    align-items: center;
    margin-top: ${vars.spacePx};
    border-radius: ${vars.borderRadiusPx};
`;
const ScheduleTimeOptionItemLabel = styled.Text<TextProps & ScheduleTimeOptionItemSelected>`
    font-size: 16px;
    font-weight: bold;
    color: ${props => (props.selected) ? vars.white : vars.dark0};
`;

export const ScheduleTimeOptionItem = ({
    value,
    selected = false,
    onChecked,
}: ScheduleTimeOptionItemProps) => {

    const [isSelected, setIsSelected] = useState(selected);

    useEffect(() => setIsSelected(selected), [selected]);

    useEffect(() => {

        if (typeof onChecked === 'function') {
            onChecked(isSelected);
        }

    }, [isSelected]);

    return (
        <ScheduleTimeOptionItemWrapper
            selected={selected}
            onPress={() => setIsSelected(!isSelected)}
        >
            <ScheduleTimeOptionItemLabel selected={selected}>{value}</ScheduleTimeOptionItemLabel>
        </ScheduleTimeOptionItemWrapper>
    )

}