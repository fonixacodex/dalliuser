"use client";

import { MenuItem } from "../types/settings.types";
import SettingsMenuItem from "./SettingsMenuItem";

interface SettingsMenuProps {
  items: MenuItem[];
}

export default function SettingsMenu({ items }: SettingsMenuProps) {
  return (
    <div className="p-2 space-y-0.5">
      {items.map((item, index) => (
        <SettingsMenuItem key={index} item={item} />
      ))}
    </div>
  );
}