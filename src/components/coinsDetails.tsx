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
                Price: ${coin.price} | Market Cap: ${coin.market_cap} | Volume 24h: ${coin.volume_24h} | Percent Change 24h: ${coin.percent_change_24h}
                `}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
