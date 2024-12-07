import { Coin } from "@/types";
import { Box, List, ListItem, ListItemText } from "@mui/material";

export default function CoinsDetails({ coins }: { coins: Coin[] }) {
  return (
    <Box>
      <List sx={{ p: 0 }}>
        {coins.map((coin: Coin) => (
          <ListItem
            key={coin.name}
            sx={{
              bgcolor: "background.paper",
              borderBottom: "1px solid",
              borderColor: "divider",
              pr: 7,
              position: "relative",
            }}>
            <ListItemText
              primary={`${coin.name} (${coin.symbol})`}
              secondary={`
                Price: ${coin.price.toFixed(
                  2
                )}$ | Market Cap: ${coin.market_cap.toFixed(
                2
              )} | Volume 24h: ${coin.volume_24h.toFixed(2)}  
               | Percent Change 24h: ${coin.percent_change_24h.toFixed(2) + "%"}
                `}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
