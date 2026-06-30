"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowForwardRounded,
  BadgeOutlined,
  EmailOutlined,
  LockOutlined,
  PersonOutlineRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { Link } from "@/i18n/navigation";
import AuthShell, {
  authBrand,
  authPrimaryButtonSx,
  authTextFieldSx,
} from "@/components/auth/auth-shell";

type RegisterResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

export default function RegisterForm() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function getLocalizedPath(path: string) {
    if (path.startsWith("http")) return path;

    if (locale === "id") {
      return path;
    }

    return path === "/" ? `/${locale}` : `/${locale}${path}`;
  }

  function resetMessage() {
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetMessage();

    const trimmedName = name.trim();
    const trimmedUsername = username.trim().toLowerCase();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedUsername || !trimmedEmail || !password) {
      setError(
        locale === "id" ? "Semua field wajib diisi" : "All fields are required",
      );
      return;
    }

    if (password.length < 8) {
      setError(
        locale === "id"
          ? "Password minimal 8 karakter"
          : "Password must be at least 8 characters",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          username: trimmedUsername,
          email: trimmedEmail,
          password,
        }),
      });

      const data = (await response.json()) as RegisterResponse;

      if (!response.ok) {
        const firstFieldError = data.errors
          ? Object.values(data.errors).flat()[0]
          : "";

        setError(
          firstFieldError ||
            data.message ||
            (locale === "id" ? "Registrasi gagal" : "Registration failed"),
        );
        return;
      }

      setSuccess(
        locale === "id"
          ? "Akun berhasil dibuat. Mengarahkan ke halaman login..."
          : "Account created successfully. Redirecting to login...",
      );

      setTimeout(() => {
        router.push(getLocalizedPath("/login"));
        router.refresh();
      }, 700);
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
            {locale === "id" ? "Buat akun baru." : "Create your account."}
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
              ? "Mulai catat pemasukan, pengeluaran, dan budget kamu dengan lebih rapi."
              : "Start tracking your income, expenses, and budget in a cleaner way."}
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
          <Link
            href="/login"
            style={{
              display: "grid",
              placeItems: "center",
              textDecoration: "none",
              color: "#6B7280",
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            {t("login")}
          </Link>

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
            {t("register")}
          </Box>
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

      {success ? (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
        >
          <Alert
            severity="success"
            sx={{
              mb: 2.2,
              borderRadius: "16px",
              bgcolor: "#ECFDF5",
              color: "#065F46",
              border: "1px solid #A7F3D0",
              "& .MuiAlert-icon": {
                color: authBrand.emerald,
              },
            }}
          >
            {success}
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
          <Box sx={{ display: "grid", gap: 1.55 }}>
            <TextField
              placeholder={t("name")}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              fullWidth
              disabled={loading}
              autoComplete="name"
              sx={authTextFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineRounded
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
              placeholder={t("username")}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              fullWidth
              disabled={loading}
              autoComplete="username"
              sx={authTextFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlined
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
              placeholder={t("email")}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              fullWidth
              disabled={loading}
              autoComplete="email"
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
              autoComplete="new-password"
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

            <Typography
              sx={{
                color: "#94A3B8",
                fontSize: 12,
                lineHeight: 1.6,
                fontWeight: 600,
              }}
            >
              {locale === "id"
                ? "Username hanya boleh huruf, angka, dan underscore. Password minimal 8 karakter."
                : "Username may only contain letters, numbers, and underscores. Password must be at least 8 characters."}
            </Typography>

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
                    : t("register")}
                </Box>
              </Button>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </AuthShell>
  );
}
