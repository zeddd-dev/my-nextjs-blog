"use client";

import "@blocknote/core/fonts/inter.css";
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

interface BlockEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlockEditor({ value, onChange }: BlockEditorProps) {
  const editor = useCreateBlockNote({
    initialContent: value ? JSON.parse(value) : undefined,
  });

  const CustomFormattingToolbar = () => (
    <FormattingToolbar>
      <BlockTypeSelect key="blockTypeSelect" />

      <BasicTextStyleButton basicTextStyle="bold" key="boldStyleButton" />

      <BasicTextStyleButton basicTextStyle="italic" key="italicStyleButton" />

      <BasicTextStyleButton
        basicTextStyle="underline"
        key="underlineStyleButton"
      />

      <BasicTextStyleButton basicTextStyle="strike" key="strikeStyleButton" />

      <TextAlignButton textAlignment="left" key="textAlignLeftButton" />

      <TextAlignButton textAlignment="center" key="textAlignCenterButton" />

      <TextAlignButton textAlignment="right" key="textAlignRightButton" />

      <TextAlignButton textAlignment="justify" key="textAlignJustifyButton" />

      <ColorStyleButton key="colorStyleButton" />

      <NestBlockButton key="nestBlockButton" />

      <UnnestBlockButton key="unnestBlockButton" />

      <CreateLinkButton key="createLinkButton" />
    </FormattingToolbar>
  );

  return (
    <BlockNoteView
      editor={editor}
      formattingToolbar={false}
      onChange={() => {
        onChange(JSON.stringify(editor.document));
      }}
    >
      <FormattingToolbarController
        formattingToolbar={CustomFormattingToolbar}
      />
    </BlockNoteView>
  );
}
