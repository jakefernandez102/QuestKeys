import './globals.css';

import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "QuestKeys",
  description: "Aplicación de preguntas y respuestas anónimas tipo ASK",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <main className="m-auto min-h-screen max-w-screen-lg p-4 sm:p-24">{children}</main>
      </body>
    </html>
  );
}
