import styled from "styled-components";
import colors from "../../core/constants/colors";

const InputWrapper = styled.div`
  gap: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;

  .employee-img-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    img {
      width: 50%;
      height: auto;
      min-width: 100px;
      border-radius: 50%;
    }
  }

  input {
    padding: 10px;
    font-weight: 500;
    outline: none;
    color: ${colors.SECONDARY_COLOR};
    background-color: white;
    border: 1px solid ${colors.LIGHT_GRAY_COLOR};
    font-size: 14px;
    width: 100%;
    text-overflow: ellipsis;

    &::placeholder {
      color: ${colors.DARK_GRAY_COLOR};
      font-size: 14px;
    }
    &:focus {
      border: 1px solid ${colors.DARK_GRAY_COLOR};
    }
  }

  .input-border-error,
  .input-border-error:focus {
    border: 1px solid red;
  }
  .input-field-error {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 70px; /* Adjust the min-height based on your design */
  }
  .placeholder {
    color: ${colors.DARK_GRAY_COLOR};
    font-size: 14px;
  }
  .radio-list {
    gap: 15px;
    justify-content: flex-start;
  }

  .select-border-radius {
    border-radius: 4px;
  }


  @media only screen and (max-width: 400px) {
    .radio-list {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
export default InputWrapper;
