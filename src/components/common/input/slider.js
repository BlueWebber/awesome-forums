import styled from "styled-components";

const MainDiv = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 22px;
    outline: none;
  }
  .switch input {
    position: absolute;
    top: -99999px;
    left: -99999px;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.secondaryButton};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 4px;
    bottom: 4px;
    background-color: ${({ theme }) => theme.colors.buttonText};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
  input:checked + .slider {
    background-color: ${({ theme }) => theme.colors.primaryButton};
  }
  input:focus + .slider {
    box-shadow: 0 0 1px ${({ theme }) => theme.colors.primaryButton};
  }
  input:checked + .slider:before {
    transform: translateX(18px);
  }
`;

const Slider = ({ isChecked, handleChange, id }) => {
  return (
    <MainDiv>
      <label className="switch">
        <input
          type="checkbox"
          checked={isChecked}
          id={id}
          onChange={handleChange}
        />
        <div className="slider" />
      </label>
    </MainDiv>
  );
};

export default Slider;
