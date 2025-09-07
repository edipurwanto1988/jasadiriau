import { Extensions } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";
import { HorizontalRule } from "@/views/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";

export const extensions: Extensions = [
  StarterKit.configure({
    horizontalRule: false,
    link: {
      openOnClick: false,
      enableClickSelection: true,
    },
  }),
  HorizontalRule,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TaskList,
  TaskItem.configure({ nested: true }).extend({
    renderHTML({ node, HTMLAttributes }) {
      const checked = node.attrs.checked ? "checked" : "";
      return [
        "li",
        { ...HTMLAttributes, "data-type": "taskItem" },
        [
          "label",
          {},
          [
            "input",
            {
              type: "checkbox",
              defaultChecked: checked ? true : undefined,
              disabled: true,
            },
          ],
           ["span", {}],
        ],
        ["div", 0],
      ];
    },
  }),
  Highlight.configure({ multicolor: true }),
  Image,
  Typography,
  Superscript,
  Subscript,
  Selection,
];
