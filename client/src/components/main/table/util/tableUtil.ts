import {HitResultItem} from "../body/HitsTable";

export const sortData = (data: HitResultItem[], colId: number | string, order: boolean): HitResultItem[] => {
    return [].concat(data).sort((a, b) =>
        String(a[colId]).localeCompare(String(b[colId]), undefined, {numeric: true}) * (order ? 1 : -1))
}
export const sliceData = (data: HitResultItem[], page: number, rowsPerPage: number) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
}

export const arraysAreDeepEqual = (arr1: Array<any>, arr2: Array<any>) => {
   return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index])
}