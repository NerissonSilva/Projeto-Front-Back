import Providers from "./providers";
import "../styles/globals.css";

export const metadata = {
  title: "Biblioteca Pessoal - Organize seus livros",
  description: "Gerencie sua coleção de livros, marque os já lidos e mantenha um registro de sua jornada literária",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}