export interface Blog {
  blogID: number;
  websiteID: number; // Foreign Key to the website the blog belongs to
  title: string;
  description: string;
  createdDate: Date;
  updatedDate?: Date; // Making this optional as it might not always be set
}

export interface Post {
  postID: number;
  blogID: number; // Foreign Key to the Blog
  title: string;
  content: { textBlock: string }[];
  postDate: Date;
  author: string;
  featuredImage: string;
  tags: string[]; // Array of tag names for simplicity. You can adjust this if needed.
  postSlug: string; // For SEO-friendly URLs
  publishedStatus: 'draft' | 'published' | 'archived'; // Using string literal types for clearer options
}

export interface Comment {
  commentID: number;
  postID: number; // Foreign Key to the Post
  author: string;
  content: string;
  commentDate: Date;
}

export interface Tag {
  tagID: number;
  tagName: string;
}
