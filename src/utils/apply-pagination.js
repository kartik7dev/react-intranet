export function applyPagination(documents, page, rowsPerPage) {
  if (documents.length === 0) {
    return []; // Return an empty array if documents is empty
  }
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}