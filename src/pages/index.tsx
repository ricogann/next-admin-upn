import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    if (typeof window === "undefined") return null;
    router.push("/auth/login");
}
