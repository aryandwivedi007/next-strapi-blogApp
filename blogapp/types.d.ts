interface User {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  interface ApiResponse<T> {
    data: T;
    message: string;
    sucess: boolean
  }

   interface Blog {
    id: number;
    documentId: string;
    Title: string;
    Category: string;
    Summary: string;
    IsFeatured: boolean;
    Content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Thumbnail: BlogThumbnail;
    user: BlogUser;
    comments: BlogComment[];
    like: BlogLike | null;
  }

  export type Blog = {
    id: number;
    title: string;
    summary: string;
    content: string;
    category: string;
    isFeatured: boolean;
    slug: string;
    user: number;
    createdAt: string;
    updatedAt: string;
  };

  
  
interface BlogThumbnail {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail?: ImageFormat;
      small?: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string | null;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path?: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
  }
  

  
interface BlogComment {
    id: number;
    user: BlogUser;
    content: string;
    createdAt: string;
}
  
interface BlogLike {
    id: number;
    user: BlogUser;
    likedAt: string;
}
  