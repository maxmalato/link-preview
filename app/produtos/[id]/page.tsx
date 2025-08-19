import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// --- Simulação de um Banco de Dados ---
const products = [
    {
        id: "1",
        name: "Smartphone Moderno",
        description: "O smartphone mais rápido do mercado, com câmera de 200MP.",
        imageUrl: "https://placehold.co/1200x630/3498db/ffffff?text=Smartphone",
    },
    {
        id: "2",
        name: "Notebook Ultra-fino",
        description: "Leve para qualquer lugar, com performance de desktop.",
        imageUrl: "https://placehold.co/1200x630/2ecc71/ffffff?text=Notebook",
    },
    {
        id: "3",
        name: "Fone de Ouvido Sem Fio",
        description: "Cancelamento de ruído e 30 horas de bateria.",
        imageUrl: "https://placehold.co/1200x630/9b59b6/ffffff?text=Fone+de+Ouvido",
    },
];

const getProduct = (id: string) => {
    return products.find((p) => p.id === id);
};

// --- Metadados dinâmicos ---
export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;
    const product = getProduct(id);

    if (!product) {
        return {
            title: "Produto não encontrado",
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${product.name} | Loja Fantástica`,
        description: product.description,
        openGraph: {
            title: `${product.name} | Loja Fantástica`,
            description: product.description,
            images: [
                {
                    url: product.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `Imagem de ${product.name}`,
                },
                ...previousImages,
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.name} | Loja Fantástica`,
            description: product.description,
            images: [product.imageUrl],
        },
    };
}

// --- Página dinâmica ---
export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
            <div className="text-center bg-white p-10 rounded-lg shadow-xl max-w-2xl">
                <h1 className="text-4xl font-bold mb-2 text-gray-800">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-6">{product.description}</p>
                <div className="relative w-full h-80 rounded-md overflow-hidden border mb-8">
                    <Image
                        src={product.imageUrl}
                        alt={`Imagem de ${product.name}`}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                        unoptimized
                    />
                </div>
                <Link href="/" className="text-blue-600 hover:underline">
                    &larr; Voltar para o início
                </Link>
            </div>
        </main>
    );
}
