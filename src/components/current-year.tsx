import { cacheLife } from "next/cache";

/**
 * Ano atual. Fica no HTML estático e é recalculado uma vez por dia,
 * então o rodapé vira o ano sozinho, sem novo deploy.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
