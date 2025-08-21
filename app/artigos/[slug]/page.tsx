import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// --- Simulação de banco de dados ---
const articles = [
    {
        slug: "como-escolher-um-smartphone",
        title: "Como Escolher um Smartphone",
        content: `
      Comprar um novo smartphone pode ser complicado. 
      Neste artigo, vamos explorar o que considerar: processador, câmera, bateria e sistema operacional.
    `,
        description: "Guia completo para escolher o smartphone ideal.",
        imageUrl: "https://placehold.co/1200x630/3498db/ffffff?text=Smartphone",
    },
    {
        slug: "dicas-de-programacao",
        title: "5 Dicas de Programação para Melhorar seu Código",
        content: `
      Melhore seu código com boas práticas como: escrever funções pequenas, 
      nomear variáveis de forma clara, usar versionamento e testar sempre.
    `,
        description: "Aprenda práticas simples para melhorar a qualidade do seu código.",
        imageUrl: "https://placehold.co/1200x630/2ecc71/ffffff?text=Programacao",
    },
];

// --- Função para buscar artigo ---
function getArticle(slug: string) {
    return articles.find((a) => a.slug === slug);
}

// --- Metadados dinâmicos ---
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticle(slug);

    if (!article) {
        return { title: "Artigo não encontrado" };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${article.title} | Meu Blog`,
        description: article.description,
        openGraph: {
            title: article.title,
            description: article.description,
            images: [
                {
                    url: `https://link-preview-pearl.vercel.app/${article.imageUrl}`,
                    secureUrl: `https://link-preview-pearl.vercel.app/${article.imageUrl}`,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
                ...previousImages,
            ],
        },
        twitter: {
            card: "summary",
            title: article.title,
            description: article.description,
            images: [article.imageUrl],
        },
    };
}

// --- Página do artigo ---
export default async function ArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = getArticle(slug);

    if (!article) {
        notFound();
    }

    return (
        <main className="max-w-3xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="text-gray-600 mb-6">{article.description}</p>
            <article className="prose">
                {article.content}
            </article>
            <div className="relative w-full h-64 mb-8 rounded-md overflow-hidden border">
                <Image
                    src={article.imageUrl}
                    alt={`Imagem do artigo ${article.title}`}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    unoptimized
                />
            </div>
            <Link href="/" className="block mt-8 text-blue-600 hover:underline">
                ← Voltar para o início
            </Link>
        </main>
    );
}

// --- Gerar páginas estaticamente ---
export async function generateStaticParams() {
    return articles.map((a) => ({
        slug: a.slug,
    }));
}