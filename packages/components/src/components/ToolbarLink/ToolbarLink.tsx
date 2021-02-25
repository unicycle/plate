import * as React from 'react';
import {
  DEFAULTS_LINK,
  getAbove,
  isCollapsed,
  LinkOptions,
  setDefaults,
  someNode,
  unwrapNodes,
  upsertLinkAtSelection,
} from '@udecode/slate-plugins';
import { useSlate } from 'slate-react';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';
import { ToolbarButtonProps } from '../ToolbarButton/ToolbarButton.types';

export const ToolbarLink = ({
  link,
  ...props
}: ToolbarButtonProps & LinkOptions) => {
  const options = setDefaults({ link }, DEFAULTS_LINK);
  const editor = useSlate();
  const isLink = someNode(editor, { match: { type: options.link.type } });

  return (
    <ToolbarButton
      active={isLink}
      onMouseDown={(event) => {
        event.preventDefault();
        let prevUrl = '';

        const linkNode = getAbove(editor, {
          match: { type: options.link.type },
        });
        if (linkNode) {
          prevUrl = linkNode[0].url as string;
        }
        const url = window.prompt(`Enter the URL of the link:`, prevUrl);
        if (!url) {
          linkNode &&
            editor.selection &&
            unwrapNodes(editor, {
              at: editor.selection,
              match: { type: options.link.type },
            });

          return;
        }

        // If our cursor is in middle of a link, then we don't want to inser it inline
        const shouldWrap: boolean =
          linkNode !== undefined && isCollapsed(editor.selection);
        upsertLinkAtSelection(editor, url, { wrap: shouldWrap, ...options });
      }}
      {...props}
    />
  );
};