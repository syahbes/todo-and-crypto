import { Box, Typography } from "@mui/material";

export default function PageFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: "center",
        color: "#8A8B8D",
        mt: "auto"
      }}
    >
      <Typography variant="body2">
        ©Financer.com | Confidential - Do not Share or Distribute
      </Typography>
    </Box>
  );
}