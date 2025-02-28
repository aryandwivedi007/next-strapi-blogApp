import { Card, CardContent, CardMedia, Typography, Chip, Box } from "@mui/material";
import Head from "next/head";

interface BlogProps {
  title: string;
  summary: string;
  category: string;
  content: string;
  thumbnail?: string;
}

const BlogComponent: React.FC<BlogProps> = ({ title, summary, category, content, thumbnail }) => {
  return (
    <>
    <Head>
    <title>{title} | MyBlog</title>
    <meta name="description" content={summary} />
    <meta property="og:title" content={category} />
    <meta property="og:description" content={summary} />
    
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={content} />
  </Head>
    <Card
      sx={{
        maxWidth: 600,
        width: "100%",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        mb: 3,
      }}
    >
      {/* ✅ Thumbnail (Optional) */}
      {thumbnail && (
        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:1337${thumbnail}`} // ✅ Append Strapi URL
          alt={title}
        />
      )}

      <CardContent>
        
        <Chip label={category} color="primary" sx={{ mb: 1 }} />

       
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>

        
        <Typography variant="body2" color="text.secondary" mt={1}>
          {summary}
        </Typography>

        
        <Typography variant="body2" color="text.primary" mt={1}>
          {content.length > 100 ? `${content.substring(0, 100)}...` : content}
        </Typography>
      </CardContent>
    </Card>
    </>
  );
};

export default BlogComponent;
