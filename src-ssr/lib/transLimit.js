// Sequalize 페이지징 처리
export default (page, rowsPerPage) => {
  const offset = (page-1) * rowsPerPage;
  return {offset, limit: rowsPerPage}
}
