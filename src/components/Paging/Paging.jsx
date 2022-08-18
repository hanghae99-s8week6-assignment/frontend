import React from "react";
import Pagination from "react-js-pagination";
import "./styles.css";
const Paging = ({
  totalCount,
  postPerPage,
  pageRangeDisplayed,
  handlePageChange,
  page,
}) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={postPerPage}
      totalItemsCount={totalCount ? totalCount : 0}
      pageRangeDisplayed={pageRangeDisplayed}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={handlePageChange}
      activeLinkClass="actveLinkClass"
      innerClass="pagination"
      itemClass="itemClass"
      linkClass="linkclass"
      hideFirstLastPages={true}
    />
  );
};
export default Paging;
