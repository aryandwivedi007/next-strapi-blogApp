import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { setTokens, resetTokens } from "../store/reducer/authReducer";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:1337/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    console.warn("🔄 Unauthorized request. Logging out...");
    api.dispatch(resetTokens());
    localStorage.removeItem("access_token");
  }

  return result;
};

// ✅ Define Strapi API Endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // ✅ Fetch logged-in user details
    me: builder.query<ApiResponse<User>, void>({
      query: () => "/users/me",
    }),

    login: builder.mutation<
      ApiResponse<{ jwt: string }>,
      { identifier: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/local",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation<
      ApiResponse<User>,
      { username: string; email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/local/register",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<void, void>({
      queryFn: async (_, api) => {
        console.info("🚪 Logging out user...");
        api.dispatch(resetTokens());
        localStorage.removeItem("access_token");
        return { data: undefined };
      },
    }),

    getBlogs: builder.query<ApiResponse<Blog[]>, void>({
      query: () => `/blogs?filters[IsFeatured][$eq]=true&populate=*`,
    }),

    getBlogById: builder.query<ApiResponse<Blog>, string>({
      query: (id) => `/blogs/${id}?populate=*`,
    }),

    getBlogBySlug: builder.query<ApiResponse<Blog[]>, string>({
      query: (slug) => `/blogs?filters[Slug][$eq]=${slug}&populate=*`,
    }),

    createBlog: builder.mutation<
      ApiResponse<Blog>,
      {
        title: string;
        summary: string;
        content: string;
        category: string;
        user: number;
        slug: string;
      }
    >({
      query: (body) => ({
        url: "/blogs",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          data: {
            Title: body.title,
            Summary: body.summary,
            Content: body.content,
            IsFeatured: false,
            Category: body.category,
            user: body.user,
            Slug: body.slug,
          },
        },
      }),
    }),

    updateBlog: builder.mutation<
      ApiResponse<Blog>,
      { id: number; likeCount: number }
    >({
      query: ({ id, likeCount }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          data: {
            likeCount,
          },
        },
      }),
    }),

    // ✅ Fetch comments for a specific blog post
    getCommentsByBlog: builder.query<ApiResponse<Comment[]>, number>({
      query: (blogId) =>
        `/comments?filters[blog][id][$eq]=${blogId}&populate=*`,
    }),

    createComment: builder.mutation<
      ApiResponse<Comment>,
      { content: string; blog: number; user: number }
    >({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          data: {
            content: body.content,
            blog: body.blog,
            IsFeatured: false,
            user: body.user,
          },
        },
      }),
    }),
  }),
});

// ✅ Export Hooks
export const {
  useMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useGetBlogBySlugQuery,
  useGetCommentsByBlogQuery,
  useCreateCommentMutation,
} = api;
