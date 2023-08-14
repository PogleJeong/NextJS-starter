// 모든 페이지의 component 가 _app.js 의 App function 을 거쳐 return 됨.

import Layout from "@/components/Layout";
import NavBar from "@/components/NavBar";
import Seo from "@/components/Seo";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

// component 에 App 에서 작성한 것을 추가하는 개념.
export default function App({Component, pageProps}) {
    const [ client ] = useState(()=>new QueryClient());
    return(
    <QueryClientProvider client={client}>
        <Hydrate state={pageProps.dehydratedState}>
            <Layout>
                <Seo />
                <NavBar />
                <Component {...pageProps}/>
                <span>this element from App component in _app.js</span>
            </Layout>
        </Hydrate>
    </QueryClientProvider>
    )
}