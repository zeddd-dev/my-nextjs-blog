"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

interface ArticleRendererProps {
  content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
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

  return <BlockNoteView editor={editor} editable={false} />;
}
