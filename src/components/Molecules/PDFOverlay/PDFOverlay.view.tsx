'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface PDFOverlayViewProps {
  pdfUrl: string;
  onClose: () => void;
  title?: string;
}

const PDFOverlayView: React.FC<PDFOverlayViewProps> = ({ pdfUrl, onClose, title }) => {
  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl h-[90vh] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-black bg-black text-white">
          <h3 className="font-black uppercase text-lg truncate">
            {title || 'Document'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:text-black transition-colors border-2 border-white flex-shrink-0"
            aria-label="Close"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="w-full h-[calc(100%-60px)]">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-none"
            title={title || 'PDF Document'}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PDFOverlayView;
