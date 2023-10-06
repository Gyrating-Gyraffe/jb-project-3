// Represents which filters are active:
export type ActiveFilters = {
    follow?: boolean;
    hasNotStarted?: boolean;
    inProgress?: boolean;
}

// Which type of comparison logic generic filter should use:
export enum ComparisonType {
    Equal = "Equal",
    Unequal = "Unequal",
    Bigger = "Bigger",
    Smaller = "Smaller",
    BiggerEqual = "BiggerEqual",
    SmallerEqual = "SmallerEqual"
}

// Which type of sort logic to apply in generic sort:
export enum SortType {
    Ascending = "Ascending",
    Descending = "Descending"
}

// Values of this type must be a value of object T 
// (For example: 'Oslo' is a value of type 'destination' which is a parameter of VacationModel):
type ValueOf<T> = T[keyof T];

export class FilterAndSort {

    /** Generic filter.
     * Uses a key and expected value to return a collection/array of matching elements.
     * @param collection Collection/array to filter.
     * @param filterBy Key by which to filter. Must be a key of generic type.
     * @param filterValue Value to which we compare the keys.
     * @param comparisonType Default: Equal. Type of logical comparison to apply. This determines what is 'true' and 'false' for the filter.
     * @returns Collection/array of same type.
     */
    public static filter<T>(collection: T[], filterBy: keyof T, filterValue: ValueOf<T>, comparisonType: ComparisonType = ComparisonType.Equal): T[] {
        
        const newCollection = [...collection].filter((a) => {
            const aValue = a[filterBy];

            let compared = false;

            switch (comparisonType) {
                case ComparisonType.Equal:
                    compared = filterValue === aValue;
                    break;
                case ComparisonType.Unequal:
                    compared = filterValue !== aValue;
                    break;
                case ComparisonType.Bigger:
                    compared = filterValue > aValue;
                    break;
                case ComparisonType.Smaller:
                    compared = filterValue < aValue;
                    break;
                case ComparisonType.BiggerEqual:
                    compared = filterValue >= aValue;
                    break;
                case ComparisonType.SmallerEqual:
                    compared = filterValue <= aValue;
                    break;
            }

            return compared;
        });

        return newCollection;
    }

    /** Generic sort.
     * Sorts a collection/array of elements based on a key and sorting type.
     * @param {T[]} collection Collection/array to sort.
     * @param {keyof T} sortBy Key by which to sort. Must be a key of generic type T.
     * @param {SortType} [sortType=SortType.Ascending] Type of sorting to apply, either 'Ascending' or 'Descending'.
     * @returns {T[]} Sorted collection/array of the same type.
     */
    public static sort<T>(collection: T[], sortBy: keyof T, sortType: SortType = SortType.Ascending): T[] {

        const newCollection = [...collection].sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            let sorted = 0;

            if(aValue === bValue) return sorted;

            switch(sortType) {
                case SortType.Ascending:
                    sorted = aValue < bValue ? -1 : 1;
                    break;
                case SortType.Descending:
                    sorted = aValue > bValue ? -1 : 1;
                    break;
            }

            return sorted;
        });

        return newCollection;
    }

}
