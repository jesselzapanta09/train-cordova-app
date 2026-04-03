import { useState, useCallback } from 'react';

export function useImageUpload() {
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState(null);

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setPreview(result);
      setBase64(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const reset = useCallback((existingBase64 = null) => {
    setPreview(existingBase64);
    setBase64(existingBase64);
  }, []);

  return { preview, base64, handleFile, reset };
}
