"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Box, Typography } from "@mui/material";
import {
  AutoGraphRounded,
  KeyboardArrowLeftRounded,
} from "@mui/icons-material";
import { useLocale } from "next-intl";

import { Link } from "@/i18n/navigation";

export const authBrand = {
  bg: "#080B12",
  panelDark: "#0D1424",
  panelDarker: "#070B14",
  textDark: "#111827",
  textMuted: "#6B7280",
  white: "#F8FAFC",
  border: "rgba(15,23,42,0.10)",
  borderDark: "rgba(255,255,255,0.12)",
  indigo: "#6C5CFF",
  emerald: "#22D39A",
  danger: "#EF4444",
};

type AuthShellProps = {
  children: React.ReactNode;
};

export default function AuthShell({ children }: AuthShellProps) {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 5 },
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% -10%, rgba(255,255,255,0.22), transparent 22%), radial-gradient(circle at 20% 80%, rgba(108,92,255,0.18), transparent 30%), linear-gradient(135deg, #111827 0%, #05070D 50%, #0B0F1A 100%)",
        position: "relative",
      }}
    >
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? {}
            : {
                opacity: [0.42, 0.7, 0.42],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.05) 35%, transparent 55%), radial-gradient(circle at 80% 70%, rgba(34,211,154,0.14), transparent 28%)",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? {}
            : {
                y: [0, -18, 0],
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: -180,
          left: -120,
          width: 520,
          height: 520,
          borderRadius: "999px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.16), transparent 65%)",
          filter: "blur(16px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 24,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          width: "100%",
          maxWidth: 1120,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            p: { xs: 1.2, sm: 1.6 },
            borderRadius: { xs: "30px", md: "42px" },
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow:
              "0 40px 140px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.14)",
            backdropFilter: "blur(24px)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "0.92fr 1.08fr" },
              minHeight: { xs: "auto", md: 680 },
              overflow: "hidden",
              borderRadius: { xs: "24px", md: "34px" },
              background: "#F8FAFC",
            }}
          >
            {/* LEFT FORM AREA */}
            <motion.div
              initial={{
                opacity: 0,
                x: -36,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  px: { xs: 3, sm: 5, md: 7 },
                  py: { xs: 4, sm: 5, md: 7 },
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, #F4F7FB 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  color: authBrand.textDark,
                }}
              >
                <Box sx={{ width: "100%", maxWidth: 430, mx: "auto" }}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.22,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href="/"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#64748B",
                        textDecoration: "none",
                        fontSize: 13,
                        fontWeight: 800,
                        marginBottom: 26,
                      }}
                    >
                      <KeyboardArrowLeftRounded fontSize="small" />
                      {locale === "id"
                        ? "Kembali ke Website Home"
                        : "Back to Website Home"}
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href="/"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        textDecoration: "none",
                        color: "inherit",
                        marginBottom: 32,
                      }}
                    >
                      <Box
                        component="img"
                        src="/logos/rupika-logo-icon.svg"
                        alt="Rupika"
                        sx={{
                          width: 42,
                          height: 42,
                          display: "block",
                        }}
                      />

                      <Box>
                        <Typography
                          sx={{
                            fontSize: 24,
                            lineHeight: 1,
                            fontWeight: 900,
                            letterSpacing: "-0.05em",
                          }}
                        >
                          Rupika
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.4,
                            color: authBrand.textMuted,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          Track. Understand. Grow.
                        </Typography>
                      </Box>
                    </Link>
                  </motion.div>

                  {children}
                </Box>
              </Box>
            </motion.div>

            {/* RIGHT ABSTRACT VISUAL */}
            <AuthVisual reduceMotion={reduceMotion} />
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}

function AuthVisual({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 36,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.75,
        delay: 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "relative",
          overflow: "hidden",
          bgcolor: "#07101F",
          minHeight: 680,
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 20%, rgba(108,92,255,0.30), transparent 28%), radial-gradient(circle at 80% 75%, rgba(34,211,154,0.22), transparent 30%), linear-gradient(135deg, #07101F 0%, #020617 100%)",
          }}
        />

        <motion.div
          aria-hidden
          animate={
            reduceMotion
              ? {}
              : {
                  rotate: [-12, -6, -14, -12],
                  scale: [1.08, 1.16, 1.11, 1.08],
                  x: [0, 18, -10, 0],
                  y: [0, -12, 8, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            inset: "-20%",
            opacity: 0.85,
            background:
              "conic-gradient(from 210deg at 50% 50%, transparent 0deg, rgba(108,92,255,0.0) 35deg, rgba(108,92,255,0.85) 75deg, rgba(34,211,154,0.45) 115deg, transparent 160deg, rgba(255,255,255,0.12) 230deg, transparent 300deg)",
            filter: "blur(28px)",
            transformOrigin: "center",
          }}
        />

        <motion.div
          aria-hidden
          animate={
            reduceMotion
              ? {}
              : {
                  opacity: [0.45, 0.7, 0.45],
                  scale: [1, 1.04, 1],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "8%",
            right: "-12%",
            width: 520,
            height: 620,
            borderRadius: "48% 52% 45% 55% / 50% 42% 58% 50%",
            background:
              "linear-gradient(145deg, rgba(108,92,255,0.72), rgba(34,211,154,0.18) 48%, rgba(255,255,255,0.10))",
            filter: "blur(2px)",
            transform: "rotate(18deg)",
          }}
        />

        <motion.div
          aria-hidden
          animate={
            reduceMotion
              ? {}
              : {
                  y: [0, -14, 0],
                  rotate: [12, 10, 12],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "16%",
            right: "6%",
            width: 440,
            height: 520,
            borderRadius: "46% 54% 52% 48% / 48% 58% 42% 52%",
            border: "1px solid rgba(255,255,255,0.18)",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.16), rgba(255,255,255,0.03))",
            backdropFilter: "blur(14px)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={
            reduceMotion
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
              : {
                  opacity: 1,
                  y: [0, -8, 0],
                  scale: 1,
                }
          }
          transition={{
            opacity: {
              duration: 0.45,
              delay: 0.6,
            },
            y: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 0.45,
              delay: 0.6,
            },
          }}
          style={{
            position: "absolute",
            left: 48,
            right: 48,
            bottom: 42,
          }}
        >
          <Box
            sx={{
              p: 3,
              borderRadius: "26px",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.16)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.07))",
              backdropFilter: "blur(22px)",
              boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
            }}
          >
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "-0.05em",
              }}
            >
              Track expenses beautifully.
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "rgba(255,255,255,0.70)",
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              Rupika keeps your income, spending, wallets, and budget clear in
              one calm workspace.
            </Typography>
          </Box>
        </motion.div>

        <MiniGlassCard
          top={74}
          left={52}
          title="Balance"
          value="Rp12.5M"
          tone="green"
          delay={0.1}
          reduceMotion={reduceMotion}
        />

        <MiniGlassCard
          top={170}
          left={92}
          title="Expense"
          value="Rp2.8M"
          tone="purple"
          delay={0.35}
          reduceMotion={reduceMotion}
        />

        <MiniGlassCard
          top={100}
          right={42}
          title="Budget"
          value="72%"
          tone="green"
          delay={0.6}
          reduceMotion={reduceMotion}
        />

        <Box
          sx={{
            position: "absolute",
            top: 28,
            left: 36,
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 1.6,
            py: 0.85,
            borderRadius: "999px",
            color: "#BDB9FF",
            bgcolor: "rgba(108,92,255,0.12)",
            border: "1px solid rgba(108,92,255,0.30)",
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <AutoGraphRounded sx={{ fontSize: 17 }} />
          Finance OS
        </Box>
      </Box>
    </motion.div>
  );
}

function MiniGlassCard({
  title,
  value,
  tone,
  top,
  left,
  right,
  delay,
  reduceMotion,
}: {
  title: string;
  value: string;
  tone: "green" | "purple";
  top: number;
  left?: number;
  right?: number;
  delay: number;
  reduceMotion: boolean | null;
}) {
  const color = tone === "green" ? authBrand.emerald : authBrand.indigo;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
        scale: 0.94,
      }}
      animate={
        reduceMotion
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {
              opacity: 1,
              y: [0, -12, 0],
              scale: 1,
            }
      }
      transition={{
        opacity: {
          duration: 0.4,
          delay: 0.5 + delay,
        },
        scale: {
          duration: 0.4,
          delay: 0.5 + delay,
        },
        y: {
          duration: 5.8 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      whileHover={
        reduceMotion
          ? {}
          : {
              y: -16,
              scale: 1.04,
            }
      }
      style={{
        position: "absolute",
        top,
        left,
        right,
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.4,
          minWidth: 136,
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.16)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
          backdropFilter: "blur(18px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
        }}
      >
        <Typography
          sx={{
            color: "rgba(255,255,255,0.62)",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 0.2,
            color,
            fontSize: 22,
            fontWeight: 950,
            letterSpacing: "-0.05em",
          }}
        >
          {value}
        </Typography>
      </Box>
    </motion.div>
  );
}

export const authTextFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "999px",
    color: authBrand.textDark,
    bgcolor: "#FFFFFF",
    boxShadow: "0 10px 30px rgba(15,23,42,0.04)",
    transition: "0.2s ease",
    "& fieldset": {
      borderColor: "rgba(15,23,42,0.12)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(108,92,255,0.45)",
    },
    "&.Mui-focused fieldset": {
      borderColor: authBrand.indigo,
      boxShadow: "0 0 0 4px rgba(108,92,255,0.10)",
    },
  },
  "& .MuiInputBase-input": {
    color: authBrand.textDark,
    fontSize: 14,
    fontWeight: 600,
    py: 1.55,
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#9CA3AF",
    opacity: 1,
    fontWeight: 500,
  },
  "& .MuiInputBase-input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 100px #FFFFFF inset",
    WebkitTextFillColor: authBrand.textDark,
    caretColor: authBrand.textDark,
    borderRadius: "999px",
  },
};

export const authPrimaryButtonSx = {
  mt: 1.2,
  py: 1.45,
  borderRadius: "999px",
  color: "#fff",
  fontWeight: 900,
  textTransform: "none",
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(90deg, #6C5CFF 0%, #22D39A 100%)",
  boxShadow:
    "0 18px 38px rgba(108,92,255,0.28), 0 10px 24px rgba(34,211,154,0.15)",
  transition: "0.22s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.34) 45%, transparent 70%)",
    transform: "translateX(-120%)",
    animation: "rupika-button-shine 2.8s ease-in-out infinite",
  },
  "@keyframes rupika-button-shine": {
    "0%": {
      transform: "translateX(-120%)",
    },
    "100%": {
      transform: "translateX(120%)",
    },
  },
  "&:hover": {
    background: "linear-gradient(90deg, #786CFF 0%, #31E4AA 100%)",
    boxShadow:
      "0 24px 50px rgba(108,92,255,0.34), 0 12px 28px rgba(34,211,154,0.20)",
  },
  "&.Mui-disabled": {
    color: "rgba(255,255,255,0.65)",
    background:
      "linear-gradient(90deg, rgba(108,92,255,0.45), rgba(34,211,154,0.42))",
  },
};
