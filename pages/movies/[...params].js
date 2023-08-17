export default function Detail({params}) {
    // useRouter 는 CRS 로 페이지소스에서는 빈 div, h4 내용밖에 없음
    // [] 의 이유 : CSR 이기 때문에 js 가 다운완료가 되지 않으면 useRouter 가 정보를 가져올 수 없음 

    const [ title, id ] = params || []; 
    return (
        <div>
            <h4>{title}</h4>
        </div>
    );
}

export async function getStaticProps({ params: { params } }) { // params 는 dynamic route prop 을 져옮
    return {
        props: { params },
    }
};

export async function getStaticPaths() {
    return {
    paths: [], // 동적 경로가 없으므로 빈 배열로 설정
    fallback: 'blocking', // 다른 경로로의 접근은 서버 사이드에서 대기
    };
}