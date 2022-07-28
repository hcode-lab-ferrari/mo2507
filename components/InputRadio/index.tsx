import { useState } from "react";
import styled from "styled-components/native"
import { vars } from "../../values";

const InputRadioWrap = styled.TouchableOpacity`
    width: 22px;
    height: 22px;
    border: ${vars.gray3} 2px solid;
    justify-content: center;
    align-items: center;
    border-radius: 11px;
`;

const InputRadioChecked = styled.View`
    width: 14px;
    height: 14px;
    background-color: ${vars.blue};
    border-radius: 7px;
`;

type InputRadioProps = {
    checked: boolean;
}

export const InputRadio = ({ checked }: InputRadioProps) => {

    const [isChecked, setIsChecked] = useState(checked);

    return (
        <InputRadioWrap>
            {isChecked && <InputRadioChecked />}
        </InputRadioWrap>
    )

}