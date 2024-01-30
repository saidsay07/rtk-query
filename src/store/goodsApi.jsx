import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
    reducerPath: "goodsApi",
    tagTypes: ["Goods"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/",
    }),
    endpoints: (builder) => ({
        getGoods: builder.query({
            query: (limit = "") => `goods?${limit && `_limit=${limit}`}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: "Goods", id})),
                        {type: "Goods", id: "LIST"},
                    ]
                    : [{type: "Goods", id: "LIST"}],
        }),
        addGood: builder.mutation({
            query: (name) => ({
                url: "goods",
                method: "POST",
                body: {
                    name,
                },
            }),
            invalidatesTags: [{type: "Goods", id: "LIST"}],
        }),
        deleteGood: builder.mutation({
            query: (id) => ({
                url: `goods/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: "Goods", id: "LIST"}],
        }),
    }),
});

export const {useGetGoodsQuery, useAddGoodMutation, useDeleteGoodMutation} =
    goodsApi;
