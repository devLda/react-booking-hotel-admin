// @mui
import { styled } from "@mui/material/styles";
import { Link, Container, Typography, Divider, Box } from "@mui/material";
// hooks
// components
import Logo from "../../assets/logo.png";
import Login from "../../assets/images/illustrations/illustration_login.png";
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

const index = () => {
  return (
    <>
      <StyledRoot>
        <Box
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
            width: '10%',
          }}
        >
          <img src={Logo} alt="logo" />
        </Box>

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Admin Dashboard
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {" "}
              <Link variant="subtitle2">Get started</Link>
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>

        <StyledSection>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src={Login} alt="login" />
        </StyledSection>
      </StyledRoot>
    </>
  );
};

export default index;
