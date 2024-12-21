import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-app-production-2574.up.railway.app' }),
  tagTypes: ['Posts', 'Comments'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (_, __, id) => [{ type: 'Posts', id }],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...post }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
    addComment: builder.mutation({
      query: ({ postId, content }) => ({
        url: `/posts/${postId}/comments`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: (_, __, { postId }) => [
        { type: 'Comments', id: postId },
        { type: 'Posts', id: postId },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddCommentMutation,
} = postsApi;
