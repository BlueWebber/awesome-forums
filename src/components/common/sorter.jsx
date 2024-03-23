import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const SorterUl = styled.ul`
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: row;
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const SorterLi = styled.li`
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primaryButton : "inherit"};
  color: ${({ theme }) => theme.colors.primaryText};
  transition: 0.15s ease-in-out;
  list-style-type: none;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  margin-left: 0.7rem;
  margin-right: 0.7rem;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  border-radius: 10px;
  box-shadow: 0px 0px 7px 0px
    ${({ theme, active }) => (active ? theme.colors.shadowColor : 0)};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme, active }) =>
      active ? theme.colors.primaryButton : theme.colors.paginationHover};
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme, active }) =>
    active ? theme.colors.priamryText : theme.colors.secondaryText};
  margin-right: 0.5rem;
`;

const Sorter = ({ clauses, handleSort, currentClause }) => {
  return (
    <MainDiv>
      <SorterUl>
        {Object.keys(clauses).map((key) => (
          <SorterLi
            key={key}
            onClick={() => handleSort(key)}
            active={key === currentClause ? "true" : null}
          >
            {clauses[key].icon && (
              <StyledIcon
                icon={clauses[key].icon}
                active={key === currentClause ? "true" : null}
              />
            )}
            {clauses[key].name}
          </SorterLi>
        ))}
      </SorterUl>
    </MainDiv>
  );
};

export default Sorter;
