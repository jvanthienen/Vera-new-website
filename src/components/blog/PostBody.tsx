type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="w-full">
      {/* Content matching main page card styling */}
      <div className="bg-card border rounded-xl p-8 shadow-sm">
        <div className="mx-auto max-w-2xl">
          <div
            className="vera-blog-content max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}
