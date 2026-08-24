export interface TitledCardListProps<T> {
    title: string;
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    icon?: React.ReactNode;
    colCount?: number;
    timeline?: boolean;
}
