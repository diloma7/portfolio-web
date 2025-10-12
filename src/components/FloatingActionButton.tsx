"use client";

import { useId, useState } from "react";
import {
  Box,
  ClickAwayListener,
  Collapse,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { socials } from "@/app/(components)/header/header.config";
import SocialIcon from "@/app/(components)/header/SocialIcons";
import { BluetoothConnectedIcon } from "lucide-react";

export default function FloatingActionButton() {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const actions = socials;

  if (isSmallScreen) {
    return (
      <Paper
        component="nav"
        elevation={12}
        className="fixed bottom-0 left-0 right-0 z-[1200] flex items-center justify-around gap-2 rounded-t-2xl border-t border-border bg-background/95 px-3 py-2 text-foreground backdrop-blur-xl md:hidden"
        aria-label="Quick links footer"
        sx={{ bgcolor: "#0B1220" }}
      >
        {actions.map((action) => {
          const isExternal = action.href.startsWith("http");

          return (
            <a
              key={action.href}
              href={action.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              download={action.download ? "" : undefined}
              className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1 text-center text-xs font-medium text-white transition hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {/* <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500/90 to-blue-500/90 text-background shadow-sm"> */}
              <SocialIcon name={action.iconName} className="h-4 w-4 " />
              {/* </span> */}
              <span className="leading-none">{action.label}</span>
            </a>
          );
        })}
      </Paper>
    );
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 16, md: 32 },
          right: { xs: 16, md: 32 },
          zIndex: 1200,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          gap: 2.5,
        }}
        aria-live="polite"
      >
        <Collapse
          in={open}
          orientation="vertical"
          timeout={prefersReducedMotion ? 0 : 200}
          collapsedSize={0}
        >
          <Paper
            id={menuId}
            component="nav"
            elevation={12}
            className="rounded-2xl backdrop-blur-xl"
            aria-label="Quick links"
            sx={{ bgcolor: "#0B1220" }}
          >
            <List
              disablePadding
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
                py: 1,
                px: 1,
              }}
            >
              {actions.map((action) => {
                const isExternal = action.href.startsWith("http");
                const rel = isExternal ? "noopener noreferrer" : undefined;
                const target = isExternal ? "_blank" : undefined;

                return (
                  <ListItem
                    key={action.href}
                    disablePadding
                    sx={{ justifyContent: "center" }}
                  >
                    <Tooltip
                      title={action.label}
                      placement="left"
                      arrow
                      slotProps={{
                        tooltip: {
                          sx: {
                            bgcolor: "#0b1220", // background color
                            color: "#e2e8f0", // text (title) color
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: 3,
                            fontSize: 13, // optional
                          },
                        },
                        arrow: {
                          sx: { color: "#0b1220" }, // arrow matches tooltip bg
                        },
                      }}
                    >
                      <ListItemButton
                        component="a"
                        href={action.href}
                        target={target}
                        rel={rel}
                        download={action.download ? "" : undefined}
                        onClick={handleClose}
                        aria-label={action.label}
                        sx={{
                          justifyContent: "center",
                          p: 1,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <SocialIcon
                            name={action.iconName}
                            className="h-4 w-4"
                          />
                        </ListItemIcon>
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Collapse>

        <Tooltip
          title={open ? "Hide quick links" : "Quick links"}
          placement="left"
          arrow
          slotProps={{
            tooltip: {
              sx: {
                bgcolor: "#0b1220", // background color
                color: "#e2e8f0", // text (title) color
                border: "1px solid",
                borderColor: "divider",
                boxShadow: 3,
                fontSize: 13, // optional
              },
            },
            arrow: {
              sx: { color: "#0b1220" }, // arrow matches tooltip bg
            },
          }}
        >
          <Fab
            color="primary"
            aria-label={open ? "Close quick links" : "Open quick links"}
            aria-expanded={open}
            aria-controls={open ? menuId : undefined}
            onClick={handleToggle}
            className="bg-gradient-to-tr from-cyan-500 to-blue-500 text-primary-foreground shadow-xl transition hover:from-cyan-400 hover:to-blue-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/40"
          >
            {open ? <CloseRoundedIcon /> : <BluetoothConnectedIcon />}
          </Fab>
        </Tooltip>
      </Box>
    </ClickAwayListener>
  );
}
