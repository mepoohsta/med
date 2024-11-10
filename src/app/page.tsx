import { getResultsSummary } from "../backend/results";

export default async function Home() {
  const summary = await getResultsSummary();

  return <div className="container"></div>;
}
