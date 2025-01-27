import { TAncestor, TEditor } from '@udecode/plate-core';
import { Editor, Location, NodeEntry } from 'slate';
import { EditorParentOptions } from '../types/Editor.types';

/**
 * See {@link Editor.parent}.
 * Returns undefined if there is no parent.
 */
export const getParent = <T extends TAncestor = TAncestor>(
  editor: TEditor,
  at: Location,
  options?: EditorParentOptions
): NodeEntry<T> | undefined => {
  try {
    return Editor.parent(editor, at, options) as NodeEntry<T> | undefined;
  } catch (err) {}
};
