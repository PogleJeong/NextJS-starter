import { useRouter } from "next/router"
import Head from "next/head";

const titleName = {
    "/": "Home",
    "/about": "About",
}

export default function Seo() {
    const router = useRouter();
    return(
        <Head>
            <title>{titleName[router.pathname]} | Next.js</title>
        </Head>
    )
}