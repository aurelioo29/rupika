"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowForwardRounded,
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { Link } from "@/i18n/navigation";
import AuthShell, {
  authBrand,
  authPrimaryButtonSx,
  authTextFieldSx,
} from "@/components/auth/auth-shell";

export default function LoginForm() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();

  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function getLocalizedPath(path: string) {
    if (path.startsWith("http")) return path;

    if (locale === "id") {
      return path;
    }

    return path === "/" ? `/${locale}` : `/${locale}${path}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const trimmedIdentifier = identifier.trim().toLowerCase();

    if (!trimmedIdentifier || !password) {
      setError(
        locale === "id"
          ? "Username/email dan password wajib diisi"
          : "Username/email and password are required",
      );
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        identifier: trimmedIdentifier,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          locale === "id"
            ? "Username/email atau password salah"
            : "Invalid username/email or password",
        );
        return;
      }

      const callbackUrl = searchParams.get("callbackUrl");

      router.push(callbackUrl || getLocalizedPath("/dashboard"));
      router.refresh();
    } catch {
      setError(
        locale === "id"
          ? "Terjadi kesalahan koneksi"
          : "Connection error occurred",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay: 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: 30, sm: 36 },
              lineHeight: 1.08,
              fontWeight: 900,
              letterSpacing: "-0.055em",
              color: authBrand.textDark,
            }}
          >
            {locale === "id" ? "Selamat datang kembali!" : "Welcome back!"}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: authBrand.textMuted,
              fontSize: 14,
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            {locale === "id"
              ? "Masuk ke akun Rupika dan lanjutkan mengatur keuanganmu."
              : "Sign in to your Rupika account and continue managing your money."}
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay: 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Box
          sx={{
            mb: 3,
            p: 0.5,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderRadius: "999px",
            border: "1px solid rgba(15,23,42,0.10)",
            bgcolor: "#EEF2F7",
          }}
        >
          <Box
            sx={{
              py: 1,
              borderRadius: "999px",
              textAlign: "center",
              bgcolor: authBrand.indigo,
              color: "#fff",
              fontSize: 13,
              fontWeight: 800,
              boxShadow: "0 10px 24px rgba(108,92,255,0.24)",
            }}
          >
            {t("login")}
          </Box>

          <Link
            href="/register"
            style={{
              display: "grid",
              placeItems: "center",
              textDecoration: "none",
              color: "#6B7280",
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            {t("register")}
          </Link>
        </Box>
      </motion.div>

      {error ? (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
        >
          <Alert
            severity="error"
            sx={{
              mb: 2.2,
              borderRadius: "16px",
              bgcolor: "#FEF2F2",
              color: "#991B1B",
              border: "1px solid #FECACA",
              "& .MuiAlert-icon": {
                color: authBrand.danger,
              },
            }}
          >
            {error}
          </Alert>
        </motion.div>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: "grid", gap: 1.8 }}>
            <TextField
              placeholder={t("identifier")}
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              required
              fullWidth
              disabled={loading}
              autoComplete="username"
              sx={authTextFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined
                        sx={{
                          color: "#9CA3AF",
                          fontSize: 20,
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              placeholder={t("password")}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              fullWidth
              disabled={loading}
              autoComplete="current-password"
              sx={authTextFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined
                        sx={{
                          color: "#9CA3AF",
                          fontSize: 20,
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        edge="end"
                        onClick={() => setShowPassword((current) => !current)}
                        disabled={loading}
                        aria-label="toggle password visibility"
                        sx={{
                          color: "#6B7280",
                        }}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box
              sx={{
                mt: 0.2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": {
                        color: authBrand.indigo,
                      },
                    }}
                  />
                }
                label={locale === "id" ? "Ingat saya" : "Remember me"}
                sx={{
                  m: 0,
                  color: authBrand.textMuted,
                  "& .MuiFormControlLabel-label": {
                    fontSize: 13,
                    fontWeight: 600,
                  },
                }}
              />

              <Button
                type="button"
                variant="text"
                sx={{
                  p: 0,
                  minWidth: 0,
                  color: authBrand.indigo,
                  fontSize: 13,
                  fontWeight: 800,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                {locale === "id" ? "Lupa password?" : "Forgot password?"}
              </Button>
            </Box>

            <motion.div
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      y: -2,
                      scale: 1.01,
                    }
              }
              whileTap={
                reduceMotion
                  ? {}
                  : {
                      scale: 0.98,
                    }
              }
            >
              <Button
                type="submit"
                size="large"
                fullWidth
                disabled={loading}
                endIcon={<ArrowForwardRounded />}
                sx={authPrimaryButtonSx}
              >
                <Box
                  component="span"
                  sx={{
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {loading
                    ? locale === "id"
                      ? "Memproses..."
                      : "Processing..."
                    : t("login")}
                </Box>
              </Button>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </AuthShell>
  );
}
