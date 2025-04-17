import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlock from '@tiptap/extension-code-block';
import { FiBold, FiItalic, FiLink, FiList, FiAlignLeft, FiAlignCenter, FiAlignRight, FiCode, FiImage } from "react-icons/fi";
import { useEffect } from 'react';
import './RichTextEditor.css'; // Import custom CSS for editor styling

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-700 rounded-t-xl bg-gray-800/80 p-2 flex flex-wrap items-center gap-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('bold') ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        title="Bold"
      >
        <FiBold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('italic') ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        title="Italic"
      >
        <FiItalic size={18} />
      </button>
      <button
        onClick={() => {
          const url = window.prompt('URL')
          if (url) {
            editor.chain().focus().setLink({ href: url }).run()
          }
        }}
        className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('link') ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        title="Link"
      >
        <FiLink size={18} />
      </button>
      <div className="w-px h-6 bg-gray-700 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        title="Heading 1"
      >
        <span className="font-bold">H1</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        title="Heading 2"
      >
        <span className="font-bold">H2</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        title="Heading 3"
      >
        <span className="font-bold">H3</span>
      </button>
      <div className="w-px h-6 bg-gray-700 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('bulletList') ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        title="Bullet List"
      >
        <FiList size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('orderedList') ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        title="Numbered List"
      >
        <span className="font-bold">1.</span>
      </button>
      <div className="w-px h-6 bg-gray-700 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded hover:bg-gray-700 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        title="Align Left"
      >
        <FiAlignLeft size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded hover:bg-gray-700 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        title="Align Center"
      >
        <FiAlignCenter size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded hover:bg-gray-700 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        title="Align Right"
      >
        <FiAlignRight size={18} />
      </button>
      <div className="w-px h-6 bg-gray-700 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('codeBlock') ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
        title="Code Block"
      >
        <FiCode size={18} />
      </button>
      <button
        onClick={() => {
          const url = window.prompt('Image URL')
          if (url) {
            editor.chain().focus().setImage({ src: url }).run()
          }
        }}
        className={`p-2 rounded hover:bg-gray-700 text-gray-300`}
        title="Insert Image"
      >
        <FiImage size={18} />
      </button>
    </div>
  )
}

const RichTextEditor = ({ content, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        },
        bulletList: {},
        orderedList: {},
      }),
      Placeholder.configure({
        placeholder: 'Share your knowledge with the community...',
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
      CodeBlock,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'rich-text-editor prose prose-invert prose-lg max-w-none focus:outline-none min-h-[200px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        onUpdate(editor.getHTML());
      }
    },
  });

  // Add method to clear editor content for external use
  useEffect(() => {
    if (editor && content === "") {
      editor.commands.clearContent();
    }
  }, [editor, content]);

  return (
    <div className="editor-wrapper rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 focus-within:border-purple-500 transition-colors">
      <MenuBar editor={editor} />
      <div className="bg-gray-800/50">
        <EditorContent editor={editor} className="min-h-[200px]" />
      </div>
    </div>
  );
};

export default RichTextEditor;