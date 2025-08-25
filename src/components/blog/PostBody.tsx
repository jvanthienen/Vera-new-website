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
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none
              prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-foreground
              prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-8 prose-h1:font-bold
              prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:font-bold
              prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4 prose-h3:font-bold
              prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-primary/80 prose-a:transition-colors
              prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-6 prose-blockquote:italic 
              prose-blockquote:bg-muted prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:text-foreground
              prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-foreground
              prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded prose-pre:overflow-x-auto prose-pre:text-foreground
              prose-img:rounded-xl prose-img:my-8 prose-img:shadow-lg
              prose-ul:my-4 prose-ol:my-4
              prose-li:text-foreground prose-li:mb-1
              prose-li:marker:text-foreground
              prose-strong:text-foreground prose-strong:font-semibold
              prose-hr:border-border prose-hr:my-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}
