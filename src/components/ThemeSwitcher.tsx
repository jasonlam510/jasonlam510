import { useTranslation } from "react-i18next";
import { IconGlyph } from "./ui/IconGlyph";
import { IconButton } from "./ui/IconButton";

type ThemeSwitcherProps = {
  onToggle: () => void;
  resolvedTheme: "dark" | "light";
};

export function ThemeSwitcher({ onToggle, resolvedTheme }: ThemeSwitcherProps) {
  const { t } = useTranslation();
  const isDark = resolvedTheme === "dark";
  const ariaLabel = isDark ? t("controls.themeSwitch.light") : t("controls.themeSwitch.dark");
  const title = isDark ? t("controls.themeOptions.light") : t("controls.themeOptions.dark");

  return (
    <IconButton ariaLabel={ariaLabel} onClick={onToggle} title={title}>
      <IconGlyph>{isDark ? "☼" : "☾"}</IconGlyph>
    </IconButton>
  );
}
