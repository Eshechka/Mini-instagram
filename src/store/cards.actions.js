// import {requests as $axios} from "../../helpers/requests.js";
// const {data} = await $axios.get(
//   `/v1/photos`,
//   {
//     params: {
//       sort: "createdAt:desc",
//       limit: 10,
//     },
//   },
//   {"Content-Type": "application/json"}
// );

export const setAllCards = (cards) => {
  return {
    type: "SET_ALLCARDS",
    payload: {cards: cards},
  };
};
