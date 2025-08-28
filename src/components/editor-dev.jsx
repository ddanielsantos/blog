import React, { useState } from 'react';
import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, markdownShortcutPlugin, toolbarPlugin, UndoRedo, BoldItalicUnderlineToggles, CreateLink, InsertImage, InsertTable, InsertCodeBlock, codeBlockPlugin, linkPlugin, imagePlugin, tablePlugin } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

export default function EditorDev() {
  const [content, setContent] = useState('');
  const [filename, setFilename] = useState('novo-post.mdx');
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [tags, setTags] = useState('');
  const [draft, setDraft] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadMsg, setUploadMsg] = useState('');

  function buildFrontmatter() {
    return `---\ntitle: "${title.replace(/"/g, '\"')}"\ndescription: "${description.replace(/"/g, '\"')}"\ndate: "${date}"\ntags: [${tags.split(',').map(t => '"' + t.trim() + '"').filter(Boolean).join(', ')}]\ndraft: ${draft}\n---\n`;
  }

  async function handleSave() {
    setMessage('Salvando...');
    const fileContent = buildFrontmatter() + '\n' + content;
    const res = await fetch('/api/dev-save-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, content: fileContent }),
    });
    if (res.ok) setMessage('Salvo com sucesso!');
    else setMessage('Erro ao salvar.');
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadMsg('Enviando imagem...');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);
    const res = await fetch('/api/dev-upload-image', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setImageUrl(data.url);
      setUploadMsg('Imagem enviada!');
    } else if (res.status === 409) {
      setUploadMsg('Já existe uma imagem com esse nome.');
    } else {
      setUploadMsg('Erro ao enviar imagem.');
    }
  }

  if (import.meta.env.MODE !== 'development') {
    return <div>Editor disponível apenas em desenvolvimento.</div>;
  }

  return (
    <div>
      <input
        value={filename}
        onChange={e => setFilename(e.target.value)}
        placeholder="Nome do arquivo (ex: meu-post.mdx)"
      />
      <div>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título"
        />
        <input
          value={date}
          onChange={e => setDate(e.target.value)}
          type="date"
        />
        <input
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="Tags (separadas por vírgula)"
        />
        <label>
          <input type="checkbox" checked={draft} onChange={e => setDraft(e.target.checked)} />
          Rascunho
        </label>
      </div>
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descrição"
      />
      <div>
        <MDXEditor
          value={content}
          markdown={content}
          onChange={setContent}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            markdownShortcutPlugin(),
            codeBlockPlugin(),
            linkPlugin(),
            imagePlugin(),
            tablePlugin(),
            toolbarPlugin({
              toolbarContents: () => <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <InsertCodeBlock />
              </>
            })
          ]}
          height={400}
        />
      </div>
      <div style={{ margin: '8px 0' }}>
        <label>
          Upload de imagem:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        {uploadMsg && <span style={{ marginLeft: 8 }}>{uploadMsg}</span>}
        {imageUrl && (
          <div style={{ marginTop: 8 }}>
            <span>URL para usar no post:</span>
            <input value={imageUrl} readOnly style={{ width: 300, marginLeft: 8 }} onFocus={e => e.target.select()} />
            <button style={{ marginLeft: 8 }} onClick={() => setContent(c => c + `\n![](${imageUrl})\n`)}>Inserir no post</button>
          </div>
        )}
      </div>
      <button onClick={handleSave}>Salvar</button>
      <span>{message}</span>
    </div>
  );
}
