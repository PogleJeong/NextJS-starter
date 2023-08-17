import axios from "axios";
import { QueryClient, dehydrate } from "react-query";

export async function  getMovies() {
    //const API_KEY = "d2b9817f48c3f041b5525978824be481";
    const response = await axios.get("http://localhost:3000/api/movies"); // next.config.js 에서 rewrite 참조
    return response.data;
}

/*
    SSR(getServerSideProps)- 현재 레거시 된 방법-
*/
export default async function getServerSideProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("movies", getMovies);
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}