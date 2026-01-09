'use client';

import React, { useEffect } from 'react';
import PDFOverlayView from './PDFOverlay.view';

interface PDFOverlayControllerProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const PDFOverlayController: React.FC<PDFOverlayControllerProps> = ({ 
  pdfUrl, 
  isOpen, 
  onClose, 
  title 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <PDFOverlayView
      pdfUrl={pdfUrl}
      onClose={onClose}
      title={title}
    />
  );
};

export default PDFOverlayController;
