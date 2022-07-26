export type ScheduleServiceItemProps = {
    title: string;
    subtitle?: string;
    price: number;
    selected?: boolean;
    onChange?: (selected: boolean) => void;
};