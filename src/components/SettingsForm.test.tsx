import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SettingsForm } from "@/components/SettingsForm";
import {
  DEFAULT_PREFERENCES,
  STORAGE_KEY,
  type UserPreferences,
} from "@/lib/types/userPreferences";
import { loadPreferences } from "@/lib/userPreferencesStore";

function savedValue(): UserPreferences | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as UserPreferences) : null;
}

describe("SettingsForm", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows a required error and does not save when display name is empty", async () => {
    const user = userEvent.setup();
    render(<SettingsForm initialPreferences={DEFAULT_PREFERENCES} />);

    const input = screen.getByLabelText(/display name/i);
    await user.clear(input);
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Display name is required",
    );
    expect(savedValue()).toBeNull();
  });

  it("shows a required error for whitespace-only display name", async () => {
    const user = userEvent.setup();
    render(<SettingsForm initialPreferences={DEFAULT_PREFERENCES} />);

    const input = screen.getByLabelText(/display name/i);
    await user.clear(input);
    await user.type(input, "    ");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Display name is required",
    );
    expect(savedValue()).toBeNull();
  });

  it("saves valid preferences and trims the display name", async () => {
    const user = userEvent.setup();
    render(<SettingsForm initialPreferences={DEFAULT_PREFERENCES} />);

    const input = screen.getByLabelText(/display name/i);
    await user.clear(input);
    await user.type(input, "  Ada Lovelace  ");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.queryByRole("alert")).toBeNull();
    const saved = savedValue();
    expect(saved).not.toBeNull();
    expect(saved?.displayName).toBe("Ada Lovelace");
    expect(saved?.theme).toBe("system");
    expect(saved?.defaultModel).toBe("Claude Sonnet 4");
    expect(saved?.creativity).toBe(0.7);
    expect(saved?.streamResponses).toBe(true);
  });

  it("saves correctly at the creativity extremes (0 and 1)", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <SettingsForm initialPreferences={DEFAULT_PREFERENCES} />,
    );

    const input = screen.getByLabelText(/display name/i);
    const creativity = screen.getByLabelText(/creativity/i);

    // Extreme: 0
    await user.clear(input);
    await user.type(input, "Zero");
    fireEvent.change(creativity, { target: { value: "0" } });
    await user.click(screen.getByRole("button", { name: /save/i }));
    expect(savedValue()?.creativity).toBe(0);

    // Extreme: 1
    await user.clear(input);
    await user.type(input, "One");
    fireEvent.change(creativity, { target: { value: "1" } });
    await user.click(screen.getByRole("button", { name: /save/i }));
    expect(savedValue()?.creativity).toBe(1);

    rerender(<SettingsForm initialPreferences={DEFAULT_PREFERENCES} />);
  });

  it("shows last saved values after a simulated refresh", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <SettingsForm initialPreferences={DEFAULT_PREFERENCES} />,
    );

    const input = screen.getByLabelText(/display name/i);
    await user.clear(input);
    await user.type(input, "Katherine");
    await user.click(screen.getByRole("button", { name: /save/i }));

    // Simulate a page refresh: the page reloads preferences from the store
    // (localStorage) and passes them back into a fresh form.
    const reloaded = loadPreferences();
    rerender(<SettingsForm initialPreferences={reloaded} />);

    expect(
      (screen.getByLabelText(/display name/i) as HTMLInputElement).value,
    ).toBe("Katherine");
  });
});
