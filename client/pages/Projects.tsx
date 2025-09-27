import SectionReveal from "@/components/site/SectionReveal";

 type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string };

const media: MediaItem[] = [
  { type: "video", src: "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fcff43b65a5a5449294da14bb6b19dc41?alt=media&token=f5ab43cc-c9db-4565-8763-91569900086a&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e", alt: "Cable jointing work – video" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F5433f2b24c3e48cead39cd4cb2814c5a?format=webp&width=800", alt: "Panel wiring inside control cabinet" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F414caa84c5044363b4c7fce15b7e06ce?format=webp&width=800", alt: "Field insulation testing setup" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F94ab547298384c9da8c52a2f3dfaba2d?format=webp&width=800", alt: "Technician working on capacitor bank" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F168d102eb07a4c77b37efb63a16c8459?format=webp&width=800", alt: "Close-up of panel terminations" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F70c9a92c75f54baa9893f3e87f8a9c2a?format=webp&width=800", alt: "Outdoor cable preparation with PPE" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F58b2c36964e64f399e7b8244e617a73a?format=webp&width=800", alt: "Technician inspecting MV cable" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F943d8e64155b4a60ba0e2ca3189a28f4?format=webp&width=800", alt: "Heat-shrink application on joints" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fd28622a6527a4177b39f9bd581ebf55b?format=webp&width=800", alt: "Solar PV site and control rooms" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Ff451e4b6f7ee43f19c754e7522e6a01c?format=webp&width=800", alt: "ABB SafeLink CB operation" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F24a2daa94be8421b8dcac9c3ce626e60?format=webp&width=800", alt: "Factory acceptance test with team" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F6b957c4173704ff1898339ceea8e3de3?format=webp&width=800", alt: "Switchgear monitoring and control" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fece4700396a845649e53ca734b4875e8?format=webp&width=800", alt: "Power cabinet assembly work" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fa83e596cd398406589662ab8548e3500?format=webp&width=800", alt: "Outdoor cable jointing operations" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F9fb7fa680a6748c78d42d057d4f452ec?format=webp&width=800", alt: "Crew coordinating installation steps" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fad2925540240487b813bf58938faa2d5?format=webp&width=800", alt: "Cable trenching and protection tiles" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F8805e4e6fcd9490fb02f0d7a446987c0?format=webp&width=800", alt: "Switchyard foundation works" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F6c7cb251f7214f2cb75fdc7208b57527?format=webp&width=800", alt: "Battery bank and UPS rack" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fd902bf85af1041bc895412db850c5e68?format=webp&width=800", alt: "Wiring harness preparation" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F94178c8799bc47caa658405943f0bf61?format=webp&width=800", alt: "Field termination – heat application" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F7fcd11fff92a46dd8ad591c4212f39c3?format=webp&width=800", alt: "Field termination – inspection" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F26030b0ca9dc4a3c80d4ccefc790ae20?format=webp&width=800", alt: "Solar PV plant overview" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F936f355a4fb64bf59bbfced5485ee29d?format=webp&width=800", alt: "Switchgear operation panel" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F5c46dc89d3bb4f65b8445181cacde1b5?format=webp&width=800", alt: "Technicians testing panel outputs" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Ff47a7bf5adbd493c9f9e3c0b45b62350?format=webp&width=800", alt: "MV yard – breaker and bays" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F2b1b88c0ec1e49b59512c7cf0729bd4e?format=webp&width=800", alt: "Transformer radiators close-up" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Ffd21507c4b9949ada67b459860dc124a?format=webp&width=800", alt: "Equipment receiving and checks" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F7a66a45c58894b108206c9848ebc380e?format=webp&width=800", alt: "Switchyard aisle view" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fde1e340c81174dd4b9b877126044cb5d?format=webp&width=800", alt: "Technician verifying battery wiring" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F8c960c78c04349bda99bb92752601f62?format=webp&width=800", alt: "Battery bank wiring detail" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Ffbca4ed554ab4f7783da84e161f3833a?format=webp&width=800", alt: "Technician crimping conductors" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F157dcabbbb8548fea2349ce0cd36f960?format=webp&width=800", alt: "Substation equipment overview" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F41cf144db0c04ec085ea6ce20c2565d7?format=webp&width=800", alt: "Power transformer yard close-up" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F62368a9c89ed427298ab29e1012aa105?format=webp&width=800", alt: "Technician checking crate manifest" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fa669a225a86044d5bfcf72bd960901ed?format=webp&width=800", alt: "Substation LV/MV equipment lane" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F0e407f6dcc444923b5b8289d6380baee?format=webp&width=800", alt: "Technician preparing surge arrester leads" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F85ed1ac03eb54250a803863bb77becf3?format=webp&width=800", alt: "Team at roadside MV works" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F19b45df95dd44cfc821b32fa2d1ac97a?format=webp&width=800", alt: "Technician handling MV terminations" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F33aea13ea9494ee69c6c338a8d498329?format=webp&width=800", alt: "Switchyard walkway and trench covers" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F20c81180ff7645efbef8d63f0341bf9f?format=webp&width=800", alt: "Cable trench preparation works" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F42ffb2e079ca413b838d5938865daf52?format=webp&width=800", alt: "Transmission yard equipment bay" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F885e5b368d7c4dedb315c09dd2206eb5?format=webp&width=800", alt: "Switchyard cable trenches and markers" },
  { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F9a11824b25e54d23a1f20fddf97736ce?format=webp&width=800", alt: "Tower base earthing works" },
  { type: "video", src: "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fd98f70ac1f4e422ab4dd33be197d96ef?alt=media&token=9f32ce20-2ac3-465c-9e68-71434e10c3d9&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e", alt: "Cable jointing demo – video 1" },
  { type: "video", src: "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fc14da19a2dca40dabd5878f201029b8e?alt=media&token=6a82b60d-fd64-4473-b022-cde4e98b1190&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e", alt: "Cable jointing demo – video 2" },
  { type: "video", src: "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fb78fd0615b73492f800c1194a796e6f9?alt=media&token=b57da846-4d66-4181-9cd3-38b726576213&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e", alt: "On-site works – video 3" },
  { type: "video", src: "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F5aff8240c99b4d09b6a32e5ba66ff3d3?alt=media&token=a6bb6b62-82ad-4318-bcdc-ba90712596f8&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e", alt: "On-site works – video 4" },
  { type: "video", src: "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F640bb709d7324087b3c368b3ac76d842?alt=media&token=02281562-210e-479c-ac7d-f04380007c85&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e", alt: "On-site works – video 5" },
  { type: "video", src: "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F69f2ce5def2b421593b9c1d5af2befa2?alt=media&token=fe9e080b-2f41-4035-9905-1ba70cd90084&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e", alt: "On-site works – video 6" },
  { type: "video", src: "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fd6c72908649a42b0851f9ddbc824006c?alt=media&token=93836c2a-5375-4e41-87c7-42f61b7d7d92&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e", alt: "On-site works – video 7" },
  { type: "video", src: "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F10c6266e1f67489d9c2d866d3869d040?alt=media&token=8a35933a-64ed-4a15-9f2f-224247e2987f&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e", alt: "On-site works – video 8" },
  { type: "video", src: "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2Fe587ec0db9c34305afbffdb54674b852?alt=media&token=d6cd90b2-5af5-4894-b622-2d94ff641b6a&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e", alt: "On-site works – video 9" },
  { type: "video", src: "https://cdn.builder.io/o/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F8d84c48208434559a51f8aeffc75d051?alt=media&token=647ee9fb-64aa-454c-8d06-fb9ca09d95d7&apiKey=3bf22d05ba0448ba84dcc33dbdacf26e", alt: "On-site works – video 10" },
];

function MediaCard({ item }: { item: MediaItem }) {
  return (
    <div className="group overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-md transition">
      {item.type === "image" ? (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <video
          src={item.src}
          controls
          playsInline
          preload="metadata"
          className="w-full h-56 object-cover bg-black"
        />
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <div className="bg-background">
      <section className="section">
          <h1 className="section-title">Gallery</h1>
          <p className="mt-2 text-foreground/70">
            A visual look at our recent field works, installations, testing and commissioning.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {media.map((m, i) => (
              <MediaCard key={i} item={m} />
            ))}
          </div>
      </section>
    </div>
  );
}
