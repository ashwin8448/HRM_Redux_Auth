import styled from 'styled-components';

const EmployeeIntroSectionWrapper = styled.div<{ $nameOverflow: boolean }>`
  width: 100%;
  gap: 20px;

  h2 {
    margin-bottom: 0;
    max-width: 180px; /* Set your desired maximum width */
    cursor: ${(props) => (props.$nameOverflow ? `pointer` : `default`)};
  }

  .employee-intro {
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-start;

    .intro-title {
      justify-content: flex-start;
    }
  }

  @media only screen and (max-width: 480px) {
    &,
    .employee-intro {
      flex-direction: column;
      align-items: center;
    }
    .btn-grp {
      align-self: center;
    }
  }
`;

export default EmployeeIntroSectionWrapper;
