/**
 * =============================================================================
 * İLETİŞİM, KİMLİK VE İÇERİK — TEK KAYNAK
 * =============================================================================
 */
window.SITE_CONFIG = {
  brandName: "CozumAI",
  tagline: "Mobil · Web · AI · Veri",
  email: "anlgzl52@gmail.com",
  /** https://web3forms.com → Create Access Key (anlgzl52@gmail.com ile) */
  formAccessKey: "",
  /** Canlı site — domain bağlandıktan sonra https://cozumai.com */
  siteUrl: "https://cozumai.com",
  linkedInUrl: "",
  githubUrl: "",
  calendlyUrl: "",
  phoneTel: "+905396965983",
  phoneDisplay: "+90 539 696 59 83",
  trustLine: "İlk dönüş: iş günü içinde · NDA hazır · Uzaktan, yazılı süreç",

  stats: [
    { value: "10+", label: "canlı / pilot proje" },
    { value: "4", label: "uzmanlık alanı" },
    { value: "%40", label: "ön ödeme (başlangıç)" },
  ],

  /** Ana hizmet sütunları — HTML’deki kartlarla eşleşir */
  services: [
    {
      id: "mobil",
      title: "Mobil uygulama geliştirme",
      summary:
        "iOS ve Android için native hissi veren, mağaza onayına hazır uygulamalar. MVP’den kurumsal sürüme.",
      highlights: [
        "Flutter / React Native veya platform-native",
        "Çevrimdışı senkron, push, biyometrik giriş",
        "App Store & Play Console yayın desteği",
      ],
      stack: ["Flutter", "React Native", "Swift", "Kotlin"],
    },
    {
      id: "web",
      title: "Web sitesi & web uygulaması",
      summary:
        "Kurumsal vitrin, SaaS panelleri ve müşteri portalları. Hızlı, erişilebilir, SEO dostu.",
      highlights: [
        "Next.js / React ile performans odaklı arayüz",
        "Yönetim paneli, rol tabanlı erişim",
        "Barındırma, CI/CD ve domain yapılandırması",
      ],
      stack: ["Next.js", "React", "TypeScript", "Node.js"],
    },
    {
      id: "ai",
      title: "AI entegrasyon hizmetleri",
      summary:
        "LLM, otomasyon ve akıllı arama ile iş süreçlerinizi hızlandırın — güvenli ve ölçülebilir.",
      highlights: [
        "Sohbet asistanı, doküman Q&A, özetleme",
        "Mevcut ürüne API / webhook entegrasyonu",
        "Prompt, güvenlik ve maliyet kontrolü",
      ],
      stack: ["OpenAI", "Anthropic", "RAG", "n8n"],
    },
    {
      id: "veri",
      title: "Veri analizi & finansal raporlama",
      summary:
        "Ham veriyi karar verilebilir panolara dönüştürün. Finans, operasyon ve KPI takibi.",
      highlights: [
        "Excel / ERP / API kaynaklı ETL",
        "Canlı dashboard ve dönemsel raporlar",
        "Bütçe, nakit akışı ve senaryo modelleri",
      ],
      stack: ["PostgreSQL", "Python", "Power BI", "Metabase"],
    },
  ],
};
