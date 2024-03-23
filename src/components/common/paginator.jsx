import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";
import radius from "../../utils/radius";
import range from "../../utils/range";

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
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primaryButton : "inherit"};
  color: ${({ theme, active }) =>
    active ? theme.colors.buttonText : theme.colors.primaryButton};
  transition: 0.15s ease-in-out;
  list-style-type: none;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-right: 0.4rem;
  padding-left: 0.4rem;
  border-right: 1px solid
    ${({ theme, last }) => (last ? "none" : theme.colors.greyBorder)};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme, active }) =>
      active ? theme.colors.primaryButton : theme.colors.paginationHover};
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
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  border-radius: 50%;
  padding: 0.5rem;
  transition: 0.15s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.paginationHover};
  }
`;

const StyledLabel = styled(StyledIcon).attrs({ as: "label" })`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.3rem;
  border-radius: 20%;
`;

const Paginator = ({
  currentPage,
  handlePagination,
  numberOfPages,
  numberOfBoxes,
}) => {
  const intPage = parseInt(currentPage);

  const generateBoxes = () => {
    if (intPage > 4 && numberOfPages > 9) {
      return radius(intPage + 1, Math.floor(numberOfBoxes / 2)).filter(
        (num) => num <= numberOfPages
      );
    }
    return range(1, numberOfPages, 1);
  };

  const boxes = generateBoxes();

  return (
    <MainDiv>
      {intPage > 4 && (
        <StyledIcon
          icon={faAngleDoubleLeft}
          onClick={() => handlePagination(0)}
        />
      )}
      {intPage !== 0 && (
        <StyledLabel onClick={() => handlePagination(intPage - 1)}>
          Prev
        </StyledLabel>
      )}
      <PagiantorUl>
        {boxes.map((num, index) => {
          return (
            <PaginatorLi
              onClick={
                num - 1 === intPage ? null : () => handlePagination(num - 1)
              }
              active={num - 1 === intPage}
              key={index}
              last={index === boxes.length - 1}
            >
              {num}
            </PaginatorLi>
          );
        })}
      </PagiantorUl>
      {intPage !== numberOfPages - 1 && (
        <StyledLabel onClick={() => handlePagination(currentPage + 1)}>
          Next
        </StyledLabel>
      )}
      {numberOfPages > 9 && intPage !== numberOfPages - 1 && (
        <StyledIcon
          icon={faAngleDoubleRight}
          onClick={() => handlePagination(numberOfPages - 1)}
        />
      )}
    </MainDiv>
  );
};

export default Paginator;
