import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";

import Img_Page404 from "../../assets/images/illustrations/illustration_404.svg";

// ----------------------------------------------------------------------

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" paragraph>
            Xin lỗi, trang không được tìm thấy
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Xin lỗi, chúng tôi không thể tìm thấy trang bạn yêu cầu. Có vẻ đường
            dẫn bạn nhập không đúng.Hãy kiểm tra và thử lại
          </Typography>

          <Box
            component="img"
            src={Img_Page404}
            sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
          />

          <Button
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Về trang chủ
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
