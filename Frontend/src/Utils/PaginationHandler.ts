class PaginationHandler {

    // Returns an array of elements that should appear on a given page:
    public getPageElements<T>(array: Array<T>, maxElementsOnPage: number, currentPage: number): Array<T> {
        let returnedArray = [...array];

        // Index of first element returned based on max elements per page and current page:
        let startIndex = maxElementsOnPage * (currentPage - 1);

        // Index of last element returned:
        let endIndex = startIndex + maxElementsOnPage;

        // Prevent out of bounds:
        if(endIndex > array.length) {
            endIndex = array.length;
        }
        if(startIndex > endIndex) {
            startIndex = endIndex;
        }

        returnedArray = returnedArray.slice(startIndex, endIndex);

        return returnedArray;
    }

    // Returns the required page count for an array depending on max elements per page:
    public getPageCount<T>(array: Array<T>, maxElementsOnPage: number): number {
        let pageCount = Math.floor(array.length / maxElementsOnPage);

        // If not divisible without remainder, add one page (It will contain less than the max):
        if(array.length % maxElementsOnPage !== 0) pageCount++;

        return pageCount;
    }

}

const paginationHandler = new PaginationHandler();
export default paginationHandler;