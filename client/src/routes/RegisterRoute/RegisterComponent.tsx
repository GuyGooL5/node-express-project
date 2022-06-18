import { styled, Container, Stack } from "@mui/material";
import splash from "$/assets/images/register_splash.png";
import RegisterForm from "./RegisterForm";

const RegisterComponent = () => {
  return (
    <StyledContainer maxWidth="lg">
      <StyledStack direction="row" justifyContent="space-between">
        <LoginFormContainer>
          <RegisterForm />
        </LoginFormContainer>
        <StyledImg src={splash} />
      </StyledStack>
    </StyledContainer>
  );
};

export default RegisterComponent;

const StyledImg = styled("img")`
  height: 600px;
`;

const StyledContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  overflow: hidden;
`;

const StyledStack = styled(Stack)`
  min-width: ${({ theme }) => theme.breakpoints.values.md}px;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.primary.main} inset;
`;

const LoginFormContainer = styled("div")`
  margin: ${({ theme }) => theme.spacing(1)};
`;
