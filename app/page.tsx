import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Objeto de metadados para esta página específica.
// O Next.js usará isso para gerar as <meta> tags no <head> do HTML.
export const metadata: Metadata = {
  title: "Página Estática | Link Preview",
  description: "Esta é a descrição que aparecerá no preview da página estática.",
  openGraph: {
    title: "Página Estática | Link Preview",
    description: "Esta é a descrição que aparecerá no preview da página estática.",
    // A URL precisa ser absoluta. O Next.js ajuda a resolver isso.
    // Coloque sua imagem em /public/minha-imagem.png
    images: [
      {
        url: "/imagem-estatica.jpg",
        secureUrl: "/imagem-estatica.jpg", // URL segura para HTTPS
        width: 1200, // Largura da imagem
        height: 630, // Altura da imagem
        alt: "Imagem de preview da página estática",
      },
    ],
    locale: "pt_BR",
    type: "website",
    siteName: "Meu Site Incrível",
  },
  // Metadados específicos para o Twitter (opcional, mas recomendado)
  twitter: {
    card: "summary_large_image",
    title: "Página Estática | Link Preview",
    description: "Descrição para o preview no Twitter.",
    images: ["/imagem-estatica.jpg"], // URL absoluta da imagem
  },
};

export default function HomePage() {

  const products = [
    { id: "1", name: "Smartphone Moderno" },
    { id: "2", name: "Notebook Ultra-fino" },
    { id: "3", name: "Fone de Ouvido Sem Fio" },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-2 bg-gray-50">
      <div className="text-center bg-white p-10 rounded-lg shadow-md flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Página Estática</h1>
        <p className="text-lg text-gray-600 mb-6">
          Esta é a página principal. Compartilhe o link para ver o preview!
        </p>
        <div className="relative w-96 h-52 rounded-md overflow-hidden border shadow-lg">
          {/* Exibindo a imagem na página também */}
          <Image
            src="/imagem-estatica.jpg"
            alt="Imagem de preview"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <h2 className="text-4xl font-bold mt-10 mb-4 text-gray-800">Páginas Dinâmicas</h2>

        {/* Seção de produtos em destaque: */}
        <section className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Páginas por ID</h2>
          <ul className="flex flex-col gap-4">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/produtos/${product.id}`}
                  className="block bg-gray-100 text-gray-900 rounded-lg px-4 py-3 text-lg font-medium hover:bg-gray-200 transition"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Seçao de artigos: */}
        <section className="w-full max-w-md mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Páginas por SLUG</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/artigos/como-escolher-um-smartphone"
                className="block bg-gray-100 text-gray-900 rounded-lg px-4 py-3 text-lg font-medium hover:bg-gray-200 transition"
              >
                Como escolher o smartphone ideal
              </Link>
            </li>
            <li>
              <Link
                href="/artigos/dicas-de-programacao"
                className="block bg-gray-100 text-gray-900 rounded-lg px-4 py-3 text-lg font-medium hover:bg-gray-200 transition"
              >
                Dicas de programação para iniciantes
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}