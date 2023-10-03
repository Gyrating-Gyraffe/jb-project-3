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

class FilterAndSort {

    // Generic filter:
    public filter<T>(collection: T[], filterBy: keyof T, filterValue: ValueOf<T>, comparisonType: ComparisonType = ComparisonType.Equal): T[] {
        
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

    // Generic sort:
    public sort<T>(collection: T[], sortBy: keyof T, sortType: SortType = SortType.Ascending): T[] {

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

const filterAndSort = new FilterAndSort();
export default filterAndSort;