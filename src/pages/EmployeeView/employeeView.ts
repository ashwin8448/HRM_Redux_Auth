import { styled } from "styled-components";
import colors from "../../core/constants/colors";

const EmployeeViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${colors.WHITE_COLOR};
  border: 1px solid ${colors.LIGHT_GRAY_COLOR};
  border-radius: 10px;
  margin: 0 auto;
  max-width: 700px;
  padding: 25px;
  gap: 25px;

  p {
    margin: 0;
  }
  .details-section {
    border-top: 1px solid ${colors.LIGHT_GRAY_COLOR};
    border-bottom: 1px solid ${colors.LIGHT_GRAY_COLOR};
    width: 100%;
    justify-content: flex-start;
  }

  .material-symbols-outlined {
    color: ${colors.SECONDARY_COLOR};
    font-size: 20px;
  }
  button {
    border: 1px solid transparent;
    background: none;
    border-radius: 0;
    font-size: 18px;
    padding: 16px 0;
    color: ${colors.SECONDARY_COLOR};
    label {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .add-border-bottom {
    border-bottom: 1px solid ${colors.PRIMARY_COLOR} !important;
  }

  .detail-element {
    gap: 10px;
    width: 100%;
    .material-symbols-outlined {
      color: ${colors.LIGHT_GRAY_COLOR};
    }
  }

  img {
    width: 175px;
    border-radius: 50%;
  }

  .flex {
    display: flex;
  }

  .employee-intro-section {
    width: 100%;
    gap: 20px;
    .employee-intro {
      flex-grow: 1;
      flex-direction: column;
      .employee-status {
        border-bottom: 1px solid black;
        padding-bottom: 10px;
      }
      .employee-info {
        flex-grow: 1;
        margin-top: 10px;
        p {
          padding: 5px 0 5px 10px;
        }
        .title {
          width: 85px;
        }
      }
    }
  }
  .employee-details-section {
    width: 100%;
    border: 1px solid black;
    border-radius: 10px;
    h2 {
      border-bottom: 1px solid black;
      margin: 0;
      padding: 10px 20px;
    }
    .detail-element {
      padding: 10px 20px;
      display: flex;
      flex-wrap: wrap;
    }
  }
`;
export default EmployeeViewWrapper;
