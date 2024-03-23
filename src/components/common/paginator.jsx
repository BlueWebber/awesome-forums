import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const PagiantorUl = styled.ul`
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: row;
  border-radius: 5px;
  padding-left: 0;
  border: 1px solid ${({ theme }) => theme.colors.greyBorder};
  overflow: hidden;
`;

const PaginatorLi = styled.li`
  background-color: inherit;
  color: ${({ theme }) => theme.colors.primaryButton};
  transition: 0.15s ease-in-out;
  list-style-type: none;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border-right: 1px solid ${({ theme }) => theme.colors.greyBorder};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.paginationHover};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primaryButton};
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  flex-direction: row;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.primaryText};
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 50%;
  padding: 0.5rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  transition: 0.15s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.paginationHover};
  }
`;

const Paginator = ({ currentPage, handlePagination, numberOfPages }) => {
  const intPage = parseInt(currentPage);
  let pagesArray = [];
  numberOfPages > 10
    ? (pagesArray = Array(10).fill(0))
    : (pagesArray = Array(numberOfPages).fill(0));

  const getClassName = (index) => {
    console.log(index);
    if (index === intPage) return "active";
  };

  return (
    <MainDiv>
      {currentPage !== 0 && (
        <StyledIcon
          icon={faAngleLeft}
          onClick={() => handlePagination(currentPage - 1)}
        />
      )}
      <PagiantorUl>
        {pagesArray.map((num, index) => (
          <PaginatorLi
            onClick={() => handlePagination(index)}
            className={getClassName(index)}
            key={index}
          >
            {index + 1}
          </PaginatorLi>
        ))}
      </PagiantorUl>
      {currentPage !== numberOfPages - 1 && (
        <StyledIcon
          icon={faAngleRight}
          onClick={() => handlePagination(currentPage + 1)}
        />
      )}
    </MainDiv>
  );
};

export default Paginator;
