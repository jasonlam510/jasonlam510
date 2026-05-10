import { siteContent } from "../content/siteContent";
import { IconGlyph } from "./ui/IconGlyph";
import { IconButton } from "./ui/IconButton";

type ThemeSwitcherProps = {
  onToggle: () => void;
  resolvedTheme: "dark" | "light";
};

export function ThemeSwitcher({ onToggle, resolvedTheme }: ThemeSwitcherProps) {
  const isDark = resolvedTheme === "dark";
  const ariaLabel = isDark
    ? siteContent.controls.themeSwitch.light
    : siteContent.controls.themeSwitch.dark;
  const title = isDark
    ? siteContent.controls.themeOptions.light
    : siteContent.controls.themeOptions.dark;

  return (
    <IconButton ariaLabel={ariaLabel} onClick={onToggle} title={title}>
      <IconGlyph>{isDark ? "☼" : "☾"}</IconGlyph>
    </IconButton>
  );
}
