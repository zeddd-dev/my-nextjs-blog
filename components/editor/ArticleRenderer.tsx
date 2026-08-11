"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/shadcn/style.css";

interface ArticleRendererProps {
  content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  const editor = useCreateBlockNote({
    initialContent: content ? JSON.parse(content) : undefined,
  });

  return (
    <div className="article-content">
      <BlockNoteView editor={editor} editable={false} />
    </div>
  );
}
