// app/layout.tsx
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import MantineWrapper from "./mantine-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo Notebook Glitter",
  description: "A cute glittery calendar notebook todo app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineWrapper>{children}</MantineWrapper>
      </body>
    </html>
  );
}
