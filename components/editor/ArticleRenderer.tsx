"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useTheme } from "next-themes";

interface ArticleRendererProps {
  content: string;
}

export default function ArticleRenderer({
  content,
}: ArticleRendererProps) {
  const { resolvedTheme } = useTheme();

  let initialContent;

  try {
    // Content dari BlockNote
    initialContent = content ? JSON.parse(content) : undefined;
  } catch {
    // Kalau content adalah teks biasa
    initialContent = [
      {
        type: "paragraph",
        content: content,
      },
    ];
  }

  const editor = useCreateBlockNote({
    initialContent,
  });

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={`
        rounded-xl border border-border/60
        overflow-hidden
        bg-card text-card-foreground
        ${isDark ? "dark" : ""}
      `}
    >
      <BlockNoteView
        editor={editor}
        editable={false}
        theme={isDark ? "dark" : "light"}
      />
    </div>
  );
}