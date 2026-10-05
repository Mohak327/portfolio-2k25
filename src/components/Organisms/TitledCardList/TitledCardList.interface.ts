export interface TitledCardListProps<T> {
    title: string;
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    icon?: React.ReactNode;
    /** Rendered between the title and the cards, e.g. filter pills. */
    filters?: React.ReactNode;
    colCount?: number;
    timeline?: boolean;
}
