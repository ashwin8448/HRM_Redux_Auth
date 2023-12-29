import styled from "styled-components";

const EmployeeCardListWrapper = styled.div`
  display: grid;
  grid-gap: 20px 30px;
  grid-template-columns: repeat(4, minmax(200px, 1fr)); /* see notes below */

  @media only screen and (max-width: 1200px) {
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }

  @media only screen and (max-width: 1200px) {
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }

  @media only screen and (max-width: 728px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;
export default EmployeeCardListWrapper;
