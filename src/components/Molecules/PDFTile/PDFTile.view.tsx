"use client";

import React, { useState, useCallback } from "react";
import { FileText, LucideIcon, ExternalLink } from "lucide-react";
import PDFOverlayController from "../PDFOverlay/PDFOverlay.controller";

interface PDFTileProps {
  pdfUrl: string;
  title?: string;
  description?: string;
  className?: string;
  icon?: LucideIcon;
  type?: string;
}

const PDFTile: React.FC<PDFTileProps> = ({
  pdfUrl,
  title = "View Document",
  description,
  className = "",
  icon: Icon,
  type = "pdf",
}) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOpen = useCallback(() => {
    console.log("type", type);
    if (type === "website") {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    } else {
      setIsOverlayOpen(true);
    }
  }, [pdfUrl, type]);

  const handleClose = useCallback(() => {
    setIsOverlayOpen(false);
  }, []);

  const DefaultIcon = type === "website" ? ExternalLink : FileText;
  const DisplayIcon = Icon || DefaultIcon;

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={`group border-4 border-black p-4 bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] text-left ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 border-2 border-black group-hover:border-white group-hover:bg-white group-hover:text-black group-hover:rounded flex-shrink-0 transition-all">
            <DisplayIcon size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-black uppercase text-sm">{title}</h4>
            {description && (
              <p className="text-xs font-bold opacity-70 mt-1">{description}</p>
            )}
          </div>
        </div>
      </button>

      <PDFOverlayController
        pdfUrl={pdfUrl}
        isOpen={isOverlayOpen}
        onClose={handleClose}
        title={title}
      />
    </>
  );
};

export default PDFTile;
