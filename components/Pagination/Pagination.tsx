import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      className={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      activeClassName={css.active}
      pageCount={totalPages}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      forcePage={currentPage - 1}
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
      previousLabel="<"
      nextLabel=">"
    />
  );
}
