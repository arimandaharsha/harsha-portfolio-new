"use client";
import React from "react";
import { StyleSheetManager, ServerStyleSheet } from "styled-components";

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  if (typeof window !== "undefined") return <>{children}</>;
  const sheet = new ServerStyleSheet();
  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
} 