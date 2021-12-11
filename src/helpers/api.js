import {requests as $axios} from "./requests";

// export async function apiGetUserDefaultAlbumId(userId) {
//   const {data} = await $axios.get(`/v1/albums?where=author.id:eq:${userId}`);
//   if (data.albums) {
//     return data.albums[0].id;
//   }
//   return {};
// }

// export async function apiGetUserPosts(userId) {
//   const {data} = await $axios.get(
//     `/v1/photos?where=authorId:eq:${userId}&include=likes`
//   );
//   if (data.cards) {
//     return data.cards;
//   }
//   return {};
// }

export async function apiGetUserData(userId) {
  const {data} = await $axios.get(`/v1/authors/${userId}`);
  if (data.author) {
    return data.author;
  }
  return {};
}

export async function apiGetUserDataWToken(token, userId) {
  $axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  const {data} = await $axios.post(`/v1/authors/${userId}`);
  if (data.author) {
    return data.author;
  }
  return {};
}

export async function apiGetAllPostsWToken(token) {
  $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

  const {data} = await $axios.get(
    `/v1/photos`,
    {
      params: {
        include: "author,comments,likes",
        sort: "createdAt:desc",
        limit: 50,
      },
    },
    {"Content-Type": "application/json"}
  );
  if (data.cards) {
    return data.cards;
  }
  return [];
}

export async function apiDeletePost(postId) {
  const {data} = await $axios.delete(`/v1/photos/${postId}`, {
    headers: {"Content-Type": "application/json"},
  });

  if (data.message === "Deleted !") {
    return true;
  }
  return false;
}

export async function apiToggleLike(postId, userId) {
  const {data} = await $axios.post(`/v1/photos/${postId}/likes`, userId);
  if (data.message === "Like обновлен!") {
    return true;
  }
  return false;
}

export async function apiAddPost(postData) {
  const {data} = await $axios.post("/v1/photos", postData, {
    headers: {"Content-Type": "multipart/form-data"},
  });
  if (data.card) {
    return data.card;
  }
  return {};
}

export async function apiGetPost(postId) {
  const {data} = await $axios.get(
    `/v1/photos/${postId}`,
    {params: {include: "author,comments,likes"}},
    {"Content-Type": "application/json"}
  );

  if (data.card) {
    return data.card;
  }
  return {};
}
