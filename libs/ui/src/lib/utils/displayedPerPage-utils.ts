export const displayedPerPage = (viewPerPage: number, page: number, items: any) => {
    const startIndex = (page - 1) * viewPerPage;
    const endIndex = startIndex + viewPerPage;
    return items.slice(startIndex, endIndex);
}