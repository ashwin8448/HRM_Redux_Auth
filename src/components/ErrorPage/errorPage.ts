import styled from 'styled-components';
import colors from '../../core/constants/colors';

const ErrorPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 10px;
  margin: auto;
  

  .error-title {
    margin: 0;
    font-size: 105px;
    font-weight: 900;
    line-height: 1.5;
    color: ${colors.DARK_GRAY_COLOR};
    text-align: center;
  }

  .error-subtitle {
    color: ${colors.SECONDARY_COLOR};
    text-align: center;
  }
  .back-to-home-btn {
    background-color: ${colors.DARK_PRIMARY_COLOR};
    color: ${colors.WHITE_COLOR};
  }
`;
export default ErrorPageWrapper;
