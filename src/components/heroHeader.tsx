import { Box, Container, Typography } from "@mui/material";

export default function HeroHeader() {
  return (
    <Box
      mb={{ xs: 1, md: 3 }}
      sx={{
        backgroundImage: "url('/header_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      borderRadius={3}
      p={2}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
        }}
        color="primary.contrastText"
        mb={0}
        gutterBottom>
        Financer.com
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
        }}
        mb={2}
        color="primary.contrastText">
        Interview Exam
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
          fontStyle: "italic",
        }}
        color="primary.contrastText"
        gutterBottom
        mb={0}>
        Candidate: Shlomi Yahbes
      </Typography>
    </Box>
  );
}
