import React from "react";
import { ContentRendererProps, MediaItem, CodeItem, EmbedItem } from "./ContentRenderer.interface";
import RichTextController from "../RichText/RichText.controller";
import MediaRenderer from "@/components/Molecules/MediaRenderer/MediaRenderer.view";

const ContentRenderer: React.FC<ContentRendererProps> = ({ sections }) => {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <div key={index}>
          <h2 className="text-2xl font-bold uppercase border-b-4 border-black inline-block mb-4">
            {section.heading}
          </h2>
          <div className="space-y-6">
            {section.content.map((item, idx) => {
              switch (item.type) {
                case "paragraph":
                  return (
                    <p key={idx} className="font-medium text-md">
                      <RichTextController text={item.data as string} />
                    </p>
                  );
                case "list":
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-2">
                      {(item.data as string[]).map((listItem, listIdx) => (
                        <li key={listIdx} className="font-medium text-md">
                          <RichTextController text={listItem} />
                        </li>
                      ))}
                    </ul>
                  );
                case "ordered-list":
                  return (
                    <ol key={idx} className="list-decimal list-inside space-y-2">
                      {(item.data as string[]).map((listItem, listIdx) => (
                        <li key={listIdx} className="flex items-start gap-3">
                          <span className="bg-black text-white font-bold w-6 h-6 flex items-center justify-center text-sm mt-1 shrink-0">
                            {listIdx + 1}
                          </span>
                          <span className="font-medium text-md">
                            <RichTextController text={listItem} />
                          </span>
                        </li>
                      ))}
                    </ol>
                  );
                case "image":
                case "video":
                  const mediaData = item.data as MediaItem;
                  return (
                    <div key={idx} className="border-4 border-black p-4 bg-white">
                      <MediaRenderer
                        image={{ url: mediaData.url }}
                        alt={mediaData.alt || "Project image"}
                        width={mediaData.width || 800}
                        height={mediaData.height || 600}
                        enlargeImageOnClick={true}
                      />
                      {mediaData.caption && (
                        <p className="mt-3 font-bold text-sm text-gray-700">
                          {mediaData.caption}
                        </p>
                      )}
                    </div>
                  );
                case "code":
                  const codeData = item.data as CodeItem;
                  return (
                    <div key={idx} className="border-4 border-black bg-gray-900 overflow-hidden">
                      {codeData.filename && (
                        <div className="bg-yellow-400 border-b-4 border-black px-4 py-2 font-bold text-sm uppercase">
                          {codeData.filename}
                        </div>
                      )}
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm font-mono text-white">
                          {codeData.code}
                        </code>
                      </pre>
                    </div>
                  );
                case "embed":
                  const embedData = item.data as EmbedItem;

                  // Convert Google Drive link to embeddable format
                  let embedUrl = embedData.url;
                  if (embedUrl.includes('drive.google.com/file/d/')) {
                    const fileId = embedUrl.match(/\/d\/([^/]+)/)?.[1];
                    if (fileId) {
                      embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
                    }
                  }

                  return (
                    <div key={idx} className="border-4 border-black bg-white p-4">
                      {embedData.title && (
                        <h3 className="font-bold text-lg mb-3">{embedData.title}</h3>
                      )}
                      <div
                        className="relative w-full overflow-hidden"
                        style={{
                          paddingBottom: embedData.aspectRatio
                            ? `calc(100% / (${embedData.aspectRatio}))`
                            : '56.25%' // Default 16:9
                        }}
                      >
                        <iframe
                          src={embedUrl}
                          className="absolute top-0 left-0 w-full h-full border-2 border-black"
                          allow="autoplay"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentRenderer;
