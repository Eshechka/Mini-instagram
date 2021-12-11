import {requests as $axios} from "./requests";

export async function getUserDefaultAlbumId(userId) {
  const {data} = await $axios.get(`/v1/albums?where=author.id:eq:${userId}`);
  if (data.albums) {
    return data.albums[0].id;
  }
  return {};
}

export async function getUserPosts(userId) {
  const {data} = await $axios.get(
    `/v1/photos?where=authorId:eq:${userId}&include=likes`
  );
  if (data.cards) {
    return data.cards;
  }
  return {};
}

export async function getUserData(userId) {
  const {data} = await $axios.get(`/v1/authors/${userId}`);
  if (data.author) {
    return data.author;
  }
  return {};
}
