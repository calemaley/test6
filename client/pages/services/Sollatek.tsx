import { Link } from "react-router-dom";

const products = [
  { name: "AVS 30", spec: "30A automatic voltage switcher", pdf: "#" },
  { name: "SVS 5kVA", spec: "Single-phase stabilizer 5kVA", pdf: "#" },
  { name: "SVS 20kVA", spec: "Three-phase stabilizer 20kVA", pdf: "#" },
];

export default function Sollatek() {
  return (
    <div className="bg-background">
      <section className="section">
        <h1 className="section-title">Sollatek Products</h1>
        <p className="section-subtitle">Protection for sensitive equipment and clean power delivery.</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-foreground/60">
                <th className="py-2">Product</th>
                <th className="py-2">Specification</th>
                <th className="py-2">Datasheet</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.name} className="border-t">
                  <td className="py-3 font-semibold">{p.name}</td>
                  <td className="py-3">{p.spec}</td>
                  <td className="py-3"><a className="text-primary underline" href={p.pdf}>Download PDF</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <Link to="/contact" className="btn-primary">Purchase Inquiry</Link>
        </div>
      </section>
    </div>
  );
}
