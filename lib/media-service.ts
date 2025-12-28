/**
 * Abstracción para servicio de media (Cloudinary)
 * Permite migración futura a otros proveedores
 */

export interface UploadResult {
  url: string;
  publicId: string;
}

export class MediaService {
  static async upload(
    file: File,
    folder: string = 'tours'
  ): Promise<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error uploading file');
    }

    return response.json();
  }

  static getOptimizedUrl(
    url: string,
    width?: number,
    height?: number
  ): string {
    // Para Cloudinary, agregar transformaciones en la URL
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/upload/');
      const transformations = [];
      
      if (width) transformations.push(`w_${width}`);
      if (height) transformations.push(`h_${height}`);
      transformations.push('c_limit', 'q_auto', 'f_auto');
      
      return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
    }

    return url;
  }
}
