import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { ScheduleServiceInput } from "./ScheduleServiceInput";
import { ScheduleServiceInputChecked } from "./ScheduleServiceInputChecked";
import { ScheduleServiceItemProps } from "./ScheduleServiceItemProps";
import { ScheduleServiceItemWrap } from "./ScheduleServiceItemWrap";
import { ScheduleServiceLabel } from "./ScheduleServiceLabel";
import { ScheduleServicePrice } from "./ScheduleServicePrice";
import { ScheduleServiceSubtitle } from "./ScheduleServiceSubtitle";
import { ScheduleServiceTitle } from "./ScheduleServiceTitle";

export const ScheduleServiceItem = ({
    title,
    subtitle,
    price,
    selected = false,
    onChange,
  }: ScheduleServiceItemProps) => {
    const [isSelected, setIsSelected] = useState(selected);
  
    useEffect(() => setIsSelected(selected), [selected]);

    useEffect(() => {
      if (typeof onChange === 'function') {
        onChange(isSelected);
      }
    }, [isSelected]);
  
    return (
      <ScheduleServiceItemWrap onPress={() => setIsSelected(!isSelected)}>
        <ScheduleServiceInput>
          {isSelected && <ScheduleServiceInputChecked />}
        </ScheduleServiceInput>
        <ScheduleServiceLabel>
          <ScheduleServiceTitle>{title}</ScheduleServiceTitle>
          {subtitle && (
            <ScheduleServiceSubtitle>{subtitle}</ScheduleServiceSubtitle>
          )}
          <ScheduleServicePrice>{formatCurrency(price)}</ScheduleServicePrice>
        </ScheduleServiceLabel>
      </ScheduleServiceItemWrap>
    );
};