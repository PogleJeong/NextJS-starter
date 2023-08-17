import { getMovies } from "@/common/api";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function Home() {
  const { data, isLoading } = useQuery("movies", getMovies);
  const router = useRouter();
  const onClick = (id, title) => {
      router.push(`/movies/${title}/${id}`);
  }
  return (
    <div className="container">
      {isLoading ?
      <h1>Loading...</h1>
      :
      data?.results?.map((movie)=>(
        
        <div onClick={()=>onClick(movie.id, movie.original_title)} className="movie" id={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
       
      ))
      }
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding-left: 20%;
          padding-right: 20%;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

/* server 에서만 실행되는 함수(SSR)
  KEY: props
  value: 컴포넌트에 보낼 데이터들
*/