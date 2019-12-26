import React from 'react';
import PropTypes from 'prop-types';

import { PageBox, Container } from './styles';

const Pagination = props => {
  const { numberOfPages, currentPage, onPageClick } = props;

  // adapted from https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
  const mountPagination = (c, m) => {
    const current = c;
    const last = m;
    const delta = 2;
    const left = current - delta;
    const right = current + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= last; i += 1) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    range.forEach(i => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(
            <PageBox
              key={i}
              onClick={() => !(i === current) && onPageClick(i)}
              selected={i === current}
            >
              {l + 1}
            </PageBox>
          );
        } else if (i - l !== 1) {
          rangeWithDots.push(<PageBox key={i + 30} />);
        }
      }
      rangeWithDots.push(
        <PageBox
          key={i}
          onClick={() => !(i === current) && onPageClick(i)}
          selected={i === current}
        >
          {i}
        </PageBox>
      );
      l = i;
    });

    return rangeWithDots;
  };
  return (
    <Container>
      <PageBox onClick={() => onPageClick(1)}>«</PageBox>
      <PageBox
        onClick={() =>
          currentPage === 1 ? undefined : onPageClick(currentPage - 1)
        }
      >
        ‹
      </PageBox>
      {mountPagination(currentPage, numberOfPages)}

      <PageBox
        onClick={() =>
          currentPage === numberOfPages
            ? undefined
            : onPageClick(currentPage + 1)
        }
      >
        ›
      </PageBox>
      <PageBox onClick={() => onPageClick(numberOfPages)}>»</PageBox>
    </Container>
  );
};

Pagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
};

export default Pagination;
