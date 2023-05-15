// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography, Box } from "@mui/material";
// hooks
// components
import Logo from "../../assets/logo.png";
import LoginIll from "../../assets/images/illustrations/illustration_login.png";
// sections
import { LoginForm } from "../../components/UI/login";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 720,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.lime,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const Login = () => {
  return (
    <>
      <StyledRoot>
        <Box
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
            width: "10%",
          }}
        >
          <img src={Logo} alt="logo" />
        </Box>

        <Container maxWidth="sm">
          <StyledContent>
            <Typography className="mb-6" variant="h4" gutterBottom>
              Sign in to Admin Dashboard
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>

        <StyledSection>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src={LoginIll} alt="login" />
        </StyledSection>
      </StyledRoot>
    </>
  );
};

export default Login;
